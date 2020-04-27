include "content/v1.thrift"

namespace scala com.gu.mobile.ar.models

struct appsRendering {

    1: required v1.Content content

    2: optional i32 commentCount 
}

struct appsRenderingBlocks {

    1: required v1.Blocks blocks

    2: required map<string,string> imageMappings 
}
