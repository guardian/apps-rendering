import { NativeMessage, NativeConnection } from './thrift/NativeConnection';
import { Transport } from './thrift/Transport';
import { TBinaryProtocol, createClient, Connection } from 'thrift';
import Calculator from '../../gen-nodejs/Calculator';

declare global {
    interface Window {
        nativeCalls: Action[];
        nativeCall: (command: string) => Promise<string>;
        nativeHandler: (id: string, outcome: 'fulfilled' | 'rejected', response: string) => void;
        AndroidWebViewMessage: (command: string) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewMessage: {
                    postMessage: (nativeMessage: NativeMessage) => {};
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




function receiveMessageIOS(nativeMessage: NativeMessage) {
    console.log("[iOS] Receive Message")
    if (window.AndroidWebViewMessage) {
        // window.AndroidWebViewMessage(command)
    } else if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.iOSWebViewMessage) {
            console.log(nativeMessage)
            const message = {
                data: nativeMessage.toString("base64"),
                connectionId: "123"
            }
            window.webkit.messageHandlers.iOSWebViewMessage.postMessage(message)
    } else {
        console.warn('No native APIs available');
    }
    // server.receiveMessage(buffer)
}

function receiveMessageJS(buffer: string) {
    console.log("[JS] Receive Message");
    const buf = new Buffer(buffer);
    const writeCb = (buf: Buffer) => {};
    connection.rxMessage(new Transport(buf, writeCb));
  }

const protocol = TBinaryProtocol;
const connection = new NativeConnection({ protocol }, receiveMessageIOS);

const client = createClient(Calculator, connection as unknown as Connection);


function nativeCall(command: string): Promise<string> {
    return client.add(1, 1);

    // let resolve = (): void => {};
    // let reject = (): void => {};
    // const timestamp = Date.now();
    // const id = Math.random().toString().split('.')[1];
    // const promise = new Promise<string>(function(res, rej): void {
    //     resolve = res;
    //     reject = rej;
    //     setTimeout(function() {
    //         rej('timeout');
    //     }, ACTION_TIMEOUT_MS);
    // })

    // window.nativeCalls.push({ id, promise, timestamp, resolve, reject });

    // if (window.AndroidWebViewMessage) {
    //     window.AndroidWebViewMessage(command)
    // } else if (window.webkit
    //     && window.webkit.messageHandlers
    //     && window.webkit.messageHandlers.iOSWebViewMessage) {
    //         window.webkit.messageHandlers.iOSWebViewMessage.postMessage({ command, id })
    // } else {
    //     console.warn('No native APIs available');
    // }

    // return promise;
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
