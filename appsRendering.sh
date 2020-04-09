# scala package
# git clone git@github.com:guardian/content-api-models.git
# cd content-api-models
# cat ../appsRendering.thrift >> models/src/main/thrift/content/v1.thrift
# make sure we have sbt
# sbt scroogeGen

# publish:
# ./scala/target/scala-2.13/src_managed/thrift/com/gu/contentapi/client/model/v1/AppsRendering.scala
# ./scala/target/scala-2.13/src_managed/thrift/com/gu/contentapi/client/model/v1/AppsRenderingBlocks.scala

# we can use these files inside: src/mapiThriftModels
mkdir thriftFiles
cd thriftFiles
git clone git@github.com:guardian/content-api-models.git
git clone git@github.com:guardian/story-packages-model.git
git clone git@github.com:guardian/content-atom.git
git clone git@github.com:guardian/content-entity.git

cp -r content-atom/thrift/src/main/thrift/* .
cp -r content-api-models/models/src/main/thrift/* .
cp -r story-packages-model/thrift/src/main/thrift/* .
cp -r content-entity/thrift/src/main/thrift/* .

sed -i '' '/end/d' content/v1.thrift

cat ../appsRendering.thrift >> content/v1.thrift
thrift --gen js:ts -I ./ content/v1.thrift