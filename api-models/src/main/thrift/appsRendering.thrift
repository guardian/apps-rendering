include "content/v1.thrift"
include "events/crier/event.thrift"

namespace scala com.gu.mobile.ar.models

struct AppsRendering {

    1: required v1.Content content

    2: optional i32 commentCount 

    3: optional bool specialReport

    4: optional event.EventType eventType

}

struct AppsRenderingBlocks {

    1: required v1.Blocks blocks

    2: required map<string,string> imageMappings 
}
