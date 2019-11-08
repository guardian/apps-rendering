import { readByte, readI16, readI32, readDouble } from '../../../node_modules/thrift/lib/nodejs/lib/thrift/binary';

export class Transport {
    readBuffer: Buffer;
    writeCb: (buffer: Buffer) => void;
    buffers: Buffer[];
    inBuf: Buffer;
    readCursor: number;

    write(buffer: Buffer | string) {
        if (!(typeof buffer === "string")) {
            this.buffers.push(buffer);
        } else {
            this.buffers.push(new Buffer(buffer, 'utf8'))
        }
    }

    flush() {
        this.writeCb(Buffer.concat(this.buffers))
        this.buffers = []
    }

    setCurrSeqId() {
        console.log("setCurrSeqId called")
    }

    commitPosition() {
        console.log("commitPosition called")
    }

    ensureAvailable(len: number) {
        if (this.readCursor + len > this.inBuf.length) {
          throw("new InputBufferUnderrunError();");
        }
    }

    consume(bytesConsumed: number) {  
        this.readCursor += bytesConsumed;
    }
    
    readByte() {
        this.ensureAvailable(1);
        const byte = readByte(this.inBuf[this.readCursor]);
        this.readCursor += 1;
        return byte;
    }
    
    readI16() {
        this.ensureAvailable(2);
        const i16 = readI16(this.inBuf, this.readCursor);
        this.readCursor += 2;
        return i16;
    }
    
    readI32() {
        this.ensureAvailable(4);
        const i32 = readI32(this.inBuf, this.readCursor);
        this.readCursor += 4;
        return i32;
    }
    
    readDouble() {
        this.ensureAvailable(8);
        const d = readDouble(this.inBuf, this.readCursor);
        this.readCursor += 8;
        return d;
    }
    
    readString(len: number) {
        this.ensureAvailable(len);
        const str = this.inBuf.toString('utf8', this.readCursor, this.readCursor + len);
        this.readCursor += len;
        return str;
    }

    constructor(readBuffer: Buffer, writeCb: (buffer: Buffer) => void) {
        this.readBuffer = readBuffer;
        this.writeCb = writeCb;
        this.buffers = [];
        this.inBuf = readBuffer;
        this.readCursor = 0;
    }
}