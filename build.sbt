lazy val apiModels = project.in(file("api-models"))
  .settings(
    name := "api-models",
    organization := "com.gu",
    version := "0.1", 
    scalaVersion := "2.12.11",

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
      "com.gu" % "story-packages-model-thrift" % "2.0.2",
      "com.gu" % "content-atom-model-thrift" % "3.2.0",
      "com.gu" % "content-entity-thrift" % "2.0.2"
    ),

    publishArtifact in packageDoc := false,
    publishArtifact in packageSrc := false,
  )