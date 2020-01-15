/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as CapiDateTime from "./CapiDateTime";
export interface IMembershipElementFieldsArgs {
    originalUrl?: string;
    linkText?: string;
    linkPrefix?: string;
    title?: string;
    venue?: string;
    location?: string;
    identifier?: string;
    image?: string;
    price?: string;
    start?: CapiDateTime.CapiDateTime;
    end?: CapiDateTime.CapiDateTime;
}
export class MembershipElementFields {
    public originalUrl?: string;
    public linkText?: string;
    public linkPrefix?: string;
    public title?: string;
    public venue?: string;
    public location?: string;
    public identifier?: string;
    public image?: string;
    public price?: string;
    public start?: CapiDateTime.CapiDateTime;
    public end?: CapiDateTime.CapiDateTime;
    constructor(args?: IMembershipElementFieldsArgs) {
        if (args != null && args.originalUrl != null) {
            this.originalUrl = args.originalUrl;
        }
        if (args != null && args.linkText != null) {
            this.linkText = args.linkText;
        }
        if (args != null && args.linkPrefix != null) {
            this.linkPrefix = args.linkPrefix;
        }
        if (args != null && args.title != null) {
            this.title = args.title;
        }
        if (args != null && args.venue != null) {
            this.venue = args.venue;
        }
        if (args != null && args.location != null) {
            this.location = args.location;
        }
        if (args != null && args.identifier != null) {
            this.identifier = args.identifier;
        }
        if (args != null && args.image != null) {
            this.image = args.image;
        }
        if (args != null && args.price != null) {
            this.price = args.price;
        }
        if (args != null && args.start != null) {
            this.start = args.start;
        }
        if (args != null && args.end != null) {
            this.end = args.end;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("MembershipElementFields");
        if (this.originalUrl != null) {
            output.writeFieldBegin("originalUrl", thrift.TType.STRING, 1);
            output.writeString(this.originalUrl);
            output.writeFieldEnd();
        }
        if (this.linkText != null) {
            output.writeFieldBegin("linkText", thrift.TType.STRING, 2);
            output.writeString(this.linkText);
            output.writeFieldEnd();
        }
        if (this.linkPrefix != null) {
            output.writeFieldBegin("linkPrefix", thrift.TType.STRING, 3);
            output.writeString(this.linkPrefix);
            output.writeFieldEnd();
        }
        if (this.title != null) {
            output.writeFieldBegin("title", thrift.TType.STRING, 4);
            output.writeString(this.title);
            output.writeFieldEnd();
        }
        if (this.venue != null) {
            output.writeFieldBegin("venue", thrift.TType.STRING, 5);
            output.writeString(this.venue);
            output.writeFieldEnd();
        }
        if (this.location != null) {
            output.writeFieldBegin("location", thrift.TType.STRING, 6);
            output.writeString(this.location);
            output.writeFieldEnd();
        }
        if (this.identifier != null) {
            output.writeFieldBegin("identifier", thrift.TType.STRING, 7);
            output.writeString(this.identifier);
            output.writeFieldEnd();
        }
        if (this.image != null) {
            output.writeFieldBegin("image", thrift.TType.STRING, 8);
            output.writeString(this.image);
            output.writeFieldEnd();
        }
        if (this.price != null) {
            output.writeFieldBegin("price", thrift.TType.STRING, 9);
            output.writeString(this.price);
            output.writeFieldEnd();
        }
        if (this.start != null) {
            output.writeFieldBegin("start", thrift.TType.STRUCT, 10);
            this.start.write(output);
            output.writeFieldEnd();
        }
        if (this.end != null) {
            output.writeFieldBegin("end", thrift.TType.STRUCT, 11);
            this.end.write(output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): MembershipElementFields {
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
                        _args.originalUrl = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.linkText = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRING) {
                        const value_3: string = input.readString();
                        _args.linkPrefix = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_4: string = input.readString();
                        _args.title = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.venue = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.STRING) {
                        const value_6: string = input.readString();
                        _args.location = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.STRING) {
                        const value_7: string = input.readString();
                        _args.identifier = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_8: string = input.readString();
                        _args.image = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.STRING) {
                        const value_9: string = input.readString();
                        _args.price = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_10: CapiDateTime.CapiDateTime = CapiDateTime.CapiDateTime.read(input);
                        _args.start = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_11: CapiDateTime.CapiDateTime = CapiDateTime.CapiDateTime.read(input);
                        _args.end = value_11;
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
        return new MembershipElementFields(_args);
    }
}
