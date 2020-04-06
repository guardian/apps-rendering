struct appsRendering {

    1: required Content content

    2: optional i32 commentCount 
}

struct appsRenderingBlocks {

    1: required Blocks blocks

    2: required map<string,string> imageMappings 
}