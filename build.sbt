import ReleaseTransformations._
import sbt.io

import scala.sys.process.Process

lazy val genPackageJson = taskKey[File]("Generate the package.json file")

lazy val runThrift = taskKey[Unit]("Run the thrift command line")

lazy val apiModels = project.in(file("api-models"))
  .settings(
    name := "apps-rendering-api-models",
    organization := "com.gu",
    version := "0.1", 
    scalaVersion := "2.12.11",

    licenses += ("Apache-2.0", url("http://www.apache.org/licenses/LICENSE-2.0.html")),

    scroogeThriftDependencies in Compile ++= Seq(
      "content-api-models",
      "story-packages-model-thrift",
      "content-atom-model-thrift",
      "content-entity-thrift"
    ),

    libraryDependencies ++= Seq(
      "org.apache.thrift" % "libthrift" % "0.10.0",
      "com.twitter" %% "scrooge-core" % "20.4.1",
      "com.twitter" %% "finagle-thrift" % "20.4.1",
      "com.gu" % "content-api-models" % "15.8",
      "com.gu" %% "content-api-models-scala" % "15.8",
      "com.gu" % "story-packages-model-thrift" % "2.0.2",
      "com.gu" % "content-atom-model-thrift" % "3.2.0",
      "com.gu" % "content-entity-thrift" % "2.0.2"
    ),

    publishArtifact in packageDoc := false,
    publishArtifact in packageSrc := false,

    bintrayOrganization := Some("guardian"),
    bintrayRepository := "mobile",
    releasePublishArtifactsAction := PgpKeys.publishSigned.value,
    releaseProcess := Seq[ReleaseStep](
      checkSnapshotDependencies,
      inquireVersions,
      runClean,
      runTest,
      setReleaseVersion,
      commitReleaseVersion,
      tagRelease,
      publishArtifacts,
      releaseStepTask(bintrayRelease),
      setNextVersion,
      commitNextVersion,
      pushChanges
    ),

    Compile / genPackageJson := {
      // TODO create a new package directory
      val packageJson = target.value / "gen-nodejs" / "package.json"
      val content = s"""
                       |{
                       |  "name": "${name.value}",
                       |  "version": "${version.value}",
                       |  "description": "${description.value}",
                       |  "repository": {
                       |    "type": "git",
                       |    "url": "${scmInfo.value.map(_.browseUrl.toString).getOrElse("")}"
                       |  },
                       |  "author": "",
                       |  "license": "Apache-2.0",
                       |  "devDependencies": {
                       |    "typescript": "^3.8.3"
                       |  },
                       |  "dependencies": {
                       |    "@types/node-int64": "^0.4.29",
                       |    "@types/thrift": "^0.10.9",
                       |    "node-int64": "^0.4.0",
                       |    "thrift": "^0.13.0"
                       |  }
                       |}""".stripMargin
      io.IO.write(packageJson, content)
      packageJson
    },

    Compile / runThrift := {
      val appsRenderingFiles = (Compile / scroogeThriftSourceFolder).value ** "*.thrift"
      val importDirectoriesOptions = (Compile / scroogeUnpackDeps).value.map { dependency =>
        s"-I ${dependency.getPath}"
      }.mkString(" ")
      val episodeFiles = (Compile / scroogeUnpackDeps).value.map { dependency =>
        s"${dependency.getPath}"
      }
      val episodeFileOption = Some(episodeFiles).filter(_.nonEmpty).map(_.mkString("imports=", ":", "")).toSeq

      val generationOptions = (Seq("ts", "node", "es6", s"thrift_package_output_directory=${name.value}") ++ episodeFileOption ).mkString("--gen js:", ",", "")

      val outputDirOption = s"-o ${target.value}"
      val returnCodes = appsRenderingFiles.get().map(thriftFile => {
        val cmdline = s"thrift ${generationOptions} ${importDirectoriesOptions} ${outputDirOption} ${thriftFile.getPath}"
        println(s"Generating definitions for ${thriftFile.getName}")
        println(cmdline)
        val returnCode = Process(cmdline, baseDirectory.value) !

        io.IO.readLines(target.value / "gen-nodejs" / "thrift.js.episode").foreach(println)

        returnCode
      })

      if (returnCodes.sum != 0) {
        throw new Exception("Error during thrift compilation, check the output above")
      }
    }
  )