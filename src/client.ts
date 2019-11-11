import { nativeCall } from "native/nativeApi";

setInterval(() => {
    nativeCall('ads-ready').then(response => console.log(response))
}, 4000);
