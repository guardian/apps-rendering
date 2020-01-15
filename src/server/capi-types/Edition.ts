/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IEditionArgs {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    code: string;
}
export class Edition {
    public id: string;
    public webTitle: string;
    public webUrl: string;
    public apiUrl: string;
    public code: string;
    constructor(args: IEditionArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[id] is unset!");
        }
        if (args != null && args.webTitle != null) {
            this.webTitle = args.webTitle;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[webTitle] is unset!");
        }
        if (args != null && args.webUrl != null) {
            this.webUrl = args.webUrl;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[webUrl] is unset!");
        }
        if (args != null && args.apiUrl != null) {
            this.apiUrl = args.apiUrl;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[apiUrl] is unset!");
        }
        if (args != null && args.code != null) {
            this.code = args.code;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[code] is unset!");
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("Edition");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.TType.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.webTitle != null) {
            output.writeFieldBegin("webTitle", thrift.TType.STRING, 2);
            output.writeString(this.webTitle);
            output.writeFieldEnd();
        }
        if (this.webUrl != null) {
            output.writeFieldBegin("webUrl", thrift.TType.STRING, 3);
            output.writeString(this.webUrl);
            output.writeFieldEnd();
        }
        if (this.apiUrl != null) {
            output.writeFieldBegin("apiUrl", thrift.TType.STRING, 4);
            output.writeString(this.apiUrl);
            output.writeFieldEnd();
        }
        if (this.code != null) {
            output.writeFieldBegin("code", thrift.TType.STRING, 5);
            output.writeString(this.code);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): Edition {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.STRING) {
                        const value_1: string = input.readString();
                        _args.id = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.webTitle = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRING) {
                        const value_3: string = input.readString();
                        _args.webUrl = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_4: string = input.readString();
                        _args.apiUrl = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.code = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        if (_args.id !== undefined && _args.webTitle !== undefined && _args.webUrl !== undefined && _args.apiUrl !== undefined && _args.code !== undefined) {
            return new Edition(_args);
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read Edition from input");
        }
    }
}
