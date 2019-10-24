import { initNativeApi, nativeCall } from "native/nativeApi";

initNativeApi()

setInterval(() => {
    nativeCall('ads-ready').then(response => console.log(response))
}, 4000);
