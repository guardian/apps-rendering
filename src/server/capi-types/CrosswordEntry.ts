/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as CrosswordPosition from "./CrosswordPosition";
export interface ICrosswordEntryArgs {
    id: string;
    number?: number;
    humanNumber?: string;
    direction?: string;
    position?: CrosswordPosition.CrosswordPosition;
    separatorLocations?: Map<string, Array<number>>;
    length?: number;
    clue?: string;
    group?: Array<string>;
    solution?: string;
    format?: string;
}
export class CrosswordEntry {
    public id: string;
    public number?: number;
    public humanNumber?: string;
    public direction?: string;
    public position?: CrosswordPosition.CrosswordPosition;
    public separatorLocations?: Map<string, Array<number>>;
    public length?: number;
    public clue?: string;
    public group?: Array<string>;
    public solution?: string;
    public format?: string;
    constructor(args: ICrosswordEntryArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[id] is unset!");
        }
        if (args != null && args.number != null) {
            this.number = args.number;
        }
        if (args != null && args.humanNumber != null) {
            this.humanNumber = args.humanNumber;
        }
        if (args != null && args.direction != null) {
            this.direction = args.direction;
        }
        if (args != null && args.position != null) {
            this.position = args.position;
        }
        if (args != null && args.separatorLocations != null) {
            this.separatorLocations = args.separatorLocations;
        }
        if (args != null && args.length != null) {
            this.length = args.length;
        }
        if (args != null && args.clue != null) {
            this.clue = args.clue;
        }
        if (args != null && args.group != null) {
            this.group = args.group;
        }
        if (args != null && args.solution != null) {
            this.solution = args.solution;
        }
        if (args != null && args.format != null) {
            this.format = args.format;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("CrosswordEntry");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.TType.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.number != null) {
            output.writeFieldBegin("number", thrift.TType.I32, 2);
            output.writeI32(this.number);
            output.writeFieldEnd();
        }
        if (this.humanNumber != null) {
            output.writeFieldBegin("humanNumber", thrift.TType.STRING, 3);
            output.writeString(this.humanNumber);
            output.writeFieldEnd();
        }
        if (this.direction != null) {
            output.writeFieldBegin("direction", thrift.TType.STRING, 4);
            output.writeString(this.direction);
            output.writeFieldEnd();
        }
        if (this.position != null) {
            output.writeFieldBegin("position", thrift.TType.STRUCT, 5);
            this.position.write(output);
            output.writeFieldEnd();
        }
        if (this.separatorLocations != null) {
            output.writeFieldBegin("separatorLocations", thrift.TType.MAP, 6);
            output.writeMapBegin(thrift.TType.STRING, thrift.TType.LIST, this.separatorLocations.size);
            this.separatorLocations.forEach((value_1: Array<number>, key_1: string): void => {
                output.writeString(key_1);
                output.writeListBegin(thrift.TType.I32, value_1.length);
                value_1.forEach((value_2: number): void => {
                    output.writeI32(value_2);
                });
                output.writeListEnd();
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        if (this.length != null) {
            output.writeFieldBegin("length", thrift.TType.I32, 7);
            output.writeI32(this.length);
            output.writeFieldEnd();
        }
        if (this.clue != null) {
            output.writeFieldBegin("clue", thrift.TType.STRING, 8);
            output.writeString(this.clue);
            output.writeFieldEnd();
        }
        if (this.group != null) {
            output.writeFieldBegin("group", thrift.TType.LIST, 9);
            output.writeListBegin(thrift.TType.STRING, this.group.length);
            this.group.forEach((value_3: string): void => {
                output.writeString(value_3);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.solution != null) {
            output.writeFieldBegin("solution", thrift.TType.STRING, 10);
            output.writeString(this.solution);
            output.writeFieldEnd();
        }
        if (this.format != null) {
            output.writeFieldBegin("format", thrift.TType.STRING, 11);
            output.writeString(this.format);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): CrosswordEntry {
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
                        const value_4: string = input.readString();
                        _args.id = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.I32) {
                        const value_5: number = input.readI32();
                        _args.number = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRING) {
                        const value_6: string = input.readString();
                        _args.humanNumber = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_7: string = input.readString();
                        _args.direction = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_8: CrosswordPosition.CrosswordPosition = CrosswordPosition.CrosswordPosition.read(input);
                        _args.position = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.MAP) {
                        const value_9: Map<string, Array<number>> = new Map<string, Array<number>>();
                        const metadata_1: thrift.IThriftMap = input.readMapBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const key_2: string = input.readString();
                            const value_10: Array<number> = new Array<number>();
                            const metadata_2: thrift.IThriftList = input.readListBegin();
                            const size_2: number = metadata_2.size;
                            for (let i_2: number = 0; i_2 < size_2; i_2++) {
                                const value_11: number = input.readI32();
                                value_10.push(value_11);
                            }
                            input.readListEnd();
                            value_9.set(key_2, value_10);
                        }
                        input.readMapEnd();
                        _args.separatorLocations = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.I32) {
                        const value_12: number = input.readI32();
                        _args.length = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_13: string = input.readString();
                        _args.clue = value_13;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.LIST) {
                        const value_14: Array<string> = new Array<string>();
                        const metadata_3: thrift.IThriftList = input.readListBegin();
                        const size_3: number = metadata_3.size;
                        for (let i_3: number = 0; i_3 < size_3; i_3++) {
                            const value_15: string = input.readString();
                            value_14.push(value_15);
                        }
                        input.readListEnd();
                        _args.group = value_14;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.TType.STRING) {
                        const value_16: string = input.readString();
                        _args.solution = value_16;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.TType.STRING) {
                        const value_17: string = input.readString();
                        _args.format = value_17;
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
        if (_args.id !== undefined) {
            return new CrosswordEntry(_args);
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read CrosswordEntry from input");
        }
    }
}
