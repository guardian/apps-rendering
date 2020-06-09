include "content/v1.thrift"

namespace scala com.gu.mobile.ar.models

struct AppsRendering {

    1: required v1.Content content

    2: optional i32 commentCount 

    3: optional bool specialReport

    4: optional map<string,string> targetingParams
}
