declare global {
    interface Window {
        nativeCalls: Action[];
        nativeCall: (command: string) => Promise<string>;
        nativeHandler: (id: string, outcome: 'fulfilled' | 'rejected', response: string) => void;
        AndroidWebViewMessage: (command: string) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewMessage: {
                    postMessage: ({ command, id }: { command: string; id: string }) => {};
                };
            };
        };
    }
}

interface Action {
    id: string;
    timestamp: number;
    promise: Promise<string>;
    resolve: (response: string) => void;
    reject: () => void;
}

const ACTION_TIMEOUT_MS = 300000;

function nativeCall(command: string): Promise<string> {
    let resolve = (): void => {};
    let reject = (): void => {};
    const timestamp = Date.now();
    const id = Math.random().toString().split('.')[1];
    const promise = new Promise<string>(function(res, rej): void {
        resolve = res;
        reject = rej;
        setTimeout(function() {
            rej('timeout');
        }, ACTION_TIMEOUT_MS);
    })

    window.nativeCalls.push({ id, promise, timestamp, resolve, reject });

    if (window.AndroidWebViewMessage) {
        window.AndroidWebViewMessage(command)
    } else if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.iOSWebViewMessage) {
            window.webkit.messageHandlers.iOSWebViewMessage.postMessage({ command, id })
    } else {
        console.warn('No native APIs available');
    }

    return promise;
} 

function nativeHandler(id: string, outcome: 'fulfilled' | 'rejected', response: string): void {
    const action = window.nativeCalls.find((action: Action) => action.id === id);
    if (!action) return;
    if (outcome === 'fulfilled') {
        action.resolve(response)
    } else {
        action.reject()
    }
    window.nativeCalls = window.nativeCalls.filter((action: Action) => action.id !== id);
}

function initNativeApi(): void {
    const nativeCalls: Action[] = [];
    window.nativeCalls = nativeCalls;
    window.nativeCall = nativeCall;
    window.nativeHandler = nativeHandler;

    setInterval(() => {
        window.nativeCalls = window.nativeCalls
            .filter((action: Action) => (Date.now() - action.timestamp) < ACTION_TIMEOUT_MS)
    }, ACTION_TIMEOUT_MS);
}

export { initNativeApi, nativeCall };
