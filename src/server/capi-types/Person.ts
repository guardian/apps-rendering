/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IPerson {
    fullName: string;
}
export interface IPersonArgs {
    fullName: string;
}
export const PersonCodec: thrift.IStructCodec<IPersonArgs, IPerson> = {
    encode(args: IPersonArgs, output: thrift.TProtocol): void {
        const obj: any = {
            fullName: args.fullName
        };
        output.writeStructBegin("Person");
        if (obj.fullName != null) {
            output.writeFieldBegin("fullName", thrift.TType.STRING, 1);
            output.writeString(obj.fullName);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[fullName] is unset!");
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IPerson {
        let _args: any = {};
        input.readStructBegin();
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
                        _args.fullName = value_1;
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
        if (_args.fullName !== undefined) {
            return {
                fullName: _args.fullName
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read Person from input");
        }
    }
};
export class Person extends thrift.StructLike implements IPerson {
    public fullName: string;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IPersonArgs) {
        super();
        if (args.fullName != null) {
            const value_2: string = args.fullName;
            this.fullName = value_2;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[fullName] is unset!");
        }
    }
    public static read(input: thrift.TProtocol): Person {
        return new Person(PersonCodec.decode(input));
    }
    public static write(args: IPersonArgs, output: thrift.TProtocol): void {
        return PersonCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return PersonCodec.encode(this, output);
    }
}
