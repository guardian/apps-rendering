import { TJSONProtocol } from 'thrift';
import { Transport } from './Transport';

export interface NativeMessage {
    data: string;
    connectionId: string;
}

interface ConnectionOptions {
    transport?: typeof Transport;
    protocol?: any;
}

export class NativeConnection {
    transport: typeof Transport;
    protocol: any;
    iosFunction: (nativeMessage: NativeMessage) => void;
    client: any;

    write(buffer: NativeMessage) {
        this.iosFunction(buffer)
    }
    
    rxMessage(transport_with_data: any) {
        const message = new this.protocol(transport_with_data);
        const header = message.readMessageBegin();
        const dummy_seqid = header.rseqid * -1;
        const client = this.client;
        client._reqs[dummy_seqid] = function(err: any, success: any){
            transport_with_data.commitPosition();
    
            const callback = client._reqs[header.rseqid];
            delete client._reqs[header.rseqid];
            if (callback) {
                callback(err, success);
            }
        }
    
        if (client['recv_' + header.fname]) {
            client['recv_' + header.fname](message, header.mtype, dummy_seqid);
        } else {
            delete client._reqs[dummy_seqid];
            throw("Received a response to an unknown RPC function");
        }
    }
    
    end() {
        console.log("end called")
    }

    constructor(options: ConnectionOptions = {}, iosFunction: (nativeMessage: NativeMessage) => void) {
        this.transport = options.transport || Transport;        
        this.protocol = options.protocol || TJSONProtocol;
        this.iosFunction = iosFunction;
        this.client = null;
    }
}
