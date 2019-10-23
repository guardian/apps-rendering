interface NativeCall {
    id: number;
    promise: Promise<string>;
    timePending: number;
}

function initNativeApi() {
    const nativeCalls: [NativeCall] | [] = [];
    window['nativeCalls'] = nativeCalls;
    window['nativeHandler'] = nativeHandler;

    // loop over promises and remove old promises
    setInterval(() => {
        window['nativeCalls'] = window['nativeCalls']
            .filter((action: NativeCall) => action.timePending < 5)
            .forEach((action: NativeCall) => action.timePending++)
    }, 30000);
}

function nativeCall(command: string) {
    const id = Date.now();
    const timePending = 0;
    const promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject('timeout');
        }, 30000) 
    })

    window['nativeCalls'].push({ id, promise, timePending });

    if (window['AndroidWebViewMessage']) {
        window['AndroidWebViewMessage'](command)
    } else if (window['webkit']
        && window['webkit']['messageHandlers']
        && window['webkit']['messageHandlers']['iOSWebViewMessage']) {
            window['webkit']['messageHandlers']['iOSWebViewMessage'](command)
    }
} 


function nativeHandler(id: number, outcome: 'fulfilled' | 'rejected', response: string) {
    const action = window['nativeCalls'].find((action: NativeCall) => action.id === id);
    outcome === 'fulfilled' ? action.promise.resolve(response) : action.promise.reject();
    window['nativeCalls'] = window['nativeCalls'].filter((action: NativeCall) => action.id !== id);
}

export { initNativeApi };