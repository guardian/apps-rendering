# scala package
git clone https://github.com/guardian/content-api-models
cd content-api-models
cat ../appsRendering.thrift >> models/src/main/thrift/content/v1.thrift
# make sure we have sbt
sbt scroogeGen

# publish:
# ./scala/target/scala-2.13/src_managed/thrift/com/gu/contentapi/client/model/v1/AppsRendering.scala
# ./scala/target/scala-2.13/src_managed/thrift/com/gu/contentapi/client/model/v1/AppsRenderingBlocks.scala

# typescript package
# pull from 4 repos and join
# thrift --gen js:ts models/src/main/thrift/content/v1.thrift
# OR
# `node_modules/.bin/thrift-typescript --target thrift-server --outDir definitions models/src/main/thrift/content/v1.thrift`
# we can use these files inside: src/mapiThriftModels
