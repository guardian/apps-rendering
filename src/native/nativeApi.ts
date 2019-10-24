declare global {
    interface Window {
        nativeCalls: Action[];
        nativeCall: (command: string) => void;
        nativeHandler: (id: number, outcome: 'fulfilled' | 'rejected', response: string) => void;
        AndroidWebViewMessage: (command: string) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewMessage: (command: string) => {}
            }
        };
    }
}

interface Action {
    id: number;
    promise: Promise<any>;
}

function initNativeApi() {
    const nativeCalls: Action[] = [];
    window.nativeCalls = nativeCalls;
    window.nativeCall = nativeCall;
    window.nativeHandler = nativeHandler;

    setInterval(() => {
        window.nativeCalls = window.nativeCalls
            .filter((action: Action) => (Date.now() - action.id) < 30000)
    }, 30000);
}

function nativeCall(command: string) {
    const id = Date.now();
    const promise = new Promise(function(_resolve, reject) {
        setTimeout(function() {
            reject('timeout');
        }, 300000);
    })

    window.nativeCalls.push({ id, promise });

    if (window.AndroidWebViewMessage) {
        window.AndroidWebViewMessage(command)
    } else if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.iOSWebViewMessage) {
            window.webkit.messageHandlers.iOSWebViewMessage(command)
    } else {
        console.warn('No native APIs available');
    }
} 


function nativeHandler(id: number, outcome: 'fulfilled' | 'rejected', response: string) {
    const action = window.nativeCalls.find((action: Action) => action.id === id);
    if (!action) return;
    if (outcome === 'fulfilled') {
        Promise.resolve(response);
    } else {
        Promise.reject(response);
    }
    window.nativeCalls = window.nativeCalls.filter((action: Action) => action.id !== id);
}

export { initNativeApi };
