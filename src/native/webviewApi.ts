import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { Epic } from 'mobile-apps-thrift-typescript/Epic';

export class WebviewHandler implements Webview.IHandler {
    updateFontSize(size: number, context?: any): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    webviewThriftPackage(): number {
        return 0;
    }

    insertEpics(epics: Epic[]): void {
        console.log("inserting epics");
    }

    insertEpic(epic: Epic): void {
        console.log("inserting epic");
        console.log(epic)
    }
}