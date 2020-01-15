/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as CapiDateTime from "./CapiDateTime";
export interface IWitnessElementFieldsArgs {
    url?: string;
    originalUrl?: string;
    witnessEmbedType?: string;
    mediaId?: string;
    source?: string;
    title?: string;
    description?: string;
    authorName?: string;
    authorUsername?: string;
    authorWitnessProfileUrl?: string;
    authorGuardianProfileUrl?: string;
    caption?: string;
    alt?: string;
    width?: number;
    height?: number;
    html?: string;
    apiUrl?: string;
    photographer?: string;
    dateCreated?: CapiDateTime.CapiDateTime;
    youtubeUrl?: string;
    youtubeSource?: string;
    youtubeTitle?: string;
    youtubeDescription?: string;
    youtubeAuthorName?: string;
    youtubeHtml?: string;
    role?: string;
}
export class WitnessElementFields {
    public url?: string;
    public originalUrl?: string;
    public witnessEmbedType?: string;
    public mediaId?: string;
    public source?: string;
    public title?: string;
    public description?: string;
    public authorName?: string;
    public authorUsername?: string;
    public authorWitnessProfileUrl?: string;
    public authorGuardianProfileUrl?: string;
    public caption?: string;
    public alt?: string;
    public width?: number;
    public height?: number;
    public html?: string;
    public apiUrl?: string;
    public photographer?: string;
    public dateCreated?: CapiDateTime.CapiDateTime;
    public youtubeUrl?: string;
    public youtubeSource?: string;
    public youtubeTitle?: string;
    public youtubeDescription?: string;
    public youtubeAuthorName?: string;
    public youtubeHtml?: string;
    public role?: string;
    constructor(args?: IWitnessElementFieldsArgs) {
        if (args != null && args.url != null) {
            this.url = args.url;
        }
        if (args != null && args.originalUrl != null) {
            this.originalUrl = args.originalUrl;
        }
        if (args != null && args.witnessEmbedType != null) {
            this.witnessEmbedType = args.witnessEmbedType;
        }
        if (args != null && args.mediaId != null) {
            this.mediaId = args.mediaId;
        }
        if (args != null && args.source != null) {
            this.source = args.source;
        }
        if (args != null && args.title != null) {
            this.title = args.title;
        }
        if (args != null && args.description != null) {
            this.description = args.description;
        }
        if (args != null && args.authorName != null) {
            this.authorName = args.authorName;
        }
        if (args != null && args.authorUsername != null) {
            this.authorUsername = args.authorUsername;
        }
        if (args != null && args.authorWitnessProfileUrl != null) {
            this.authorWitnessProfileUrl = args.authorWitnessProfileUrl;
        }
        if (args != null && args.authorGuardianProfileUrl != null) {
            this.authorGuardianProfileUrl = args.authorGuardianProfileUrl;
        }
        if (args != null && args.caption != null) {
            this.caption = args.caption;
        }
        if (args != null && args.alt != null) {
            this.alt = args.alt;
        }
        if (args != null && args.width != null) {
            this.width = args.width;
        }
        if (args != null && args.height != null) {
            this.height = args.height;
        }
        if (args != null && args.html != null) {
            this.html = args.html;
        }
        if (args != null && args.apiUrl != null) {
            this.apiUrl = args.apiUrl;
        }
        if (args != null && args.photographer != null) {
            this.photographer = args.photographer;
        }
        if (args != null && args.dateCreated != null) {
            this.dateCreated = args.dateCreated;
        }
        if (args != null && args.youtubeUrl != null) {
            this.youtubeUrl = args.youtubeUrl;
        }
        if (args != null && args.youtubeSource != null) {
            this.youtubeSource = args.youtubeSource;
        }
        if (args != null && args.youtubeTitle != null) {
            this.youtubeTitle = args.youtubeTitle;
        }
        if (args != null && args.youtubeDescription != null) {
            this.youtubeDescription = args.youtubeDescription;
        }
        if (args != null && args.youtubeAuthorName != null) {
            this.youtubeAuthorName = args.youtubeAuthorName;
        }
        if (args != null && args.youtubeHtml != null) {
            this.youtubeHtml = args.youtubeHtml;
        }
        if (args != null && args.role != null) {
            this.role = args.role;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("WitnessElementFields");
        if (this.url != null) {
            output.writeFieldBegin("url", thrift.TType.STRING, 1);
            output.writeString(this.url);
            output.writeFieldEnd();
        }
        if (this.originalUrl != null) {
            output.writeFieldBegin("originalUrl", thrift.TType.STRING, 2);
            output.writeString(this.originalUrl);
            output.writeFieldEnd();
        }
        if (this.witnessEmbedType != null) {
            output.writeFieldBegin("witnessEmbedType", thrift.TType.STRING, 3);
            output.writeString(this.witnessEmbedType);
            output.writeFieldEnd();
        }
        if (this.mediaId != null) {
            output.writeFieldBegin("mediaId", thrift.TType.STRING, 4);
            output.writeString(this.mediaId);
            output.writeFieldEnd();
        }
        if (this.source != null) {
            output.writeFieldBegin("source", thrift.TType.STRING, 5);
            output.writeString(this.source);
            output.writeFieldEnd();
        }
        if (this.title != null) {
            output.writeFieldBegin("title", thrift.TType.STRING, 6);
            output.writeString(this.title);
            output.writeFieldEnd();
        }
        if (this.description != null) {
            output.writeFieldBegin("description", thrift.TType.STRING, 7);
            output.writeString(this.description);
            output.writeFieldEnd();
        }
        if (this.authorName != null) {
            output.writeFieldBegin("authorName", thrift.TType.STRING, 8);
            output.writeString(this.authorName);
            output.writeFieldEnd();
        }
        if (this.authorUsername != null) {
            output.writeFieldBegin("authorUsername", thrift.TType.STRING, 9);
            output.writeString(this.authorUsername);
            output.writeFieldEnd();
        }
        if (this.authorWitnessProfileUrl != null) {
            output.writeFieldBegin("authorWitnessProfileUrl", thrift.TType.STRING, 10);
            output.writeString(this.authorWitnessProfileUrl);
            output.writeFieldEnd();
        }
        if (this.authorGuardianProfileUrl != null) {
            output.writeFieldBegin("authorGuardianProfileUrl", thrift.TType.STRING, 11);
            output.writeString(this.authorGuardianProfileUrl);
            output.writeFieldEnd();
        }
        if (this.caption != null) {
            output.writeFieldBegin("caption", thrift.TType.STRING, 12);
            output.writeString(this.caption);
            output.writeFieldEnd();
        }
        if (this.alt != null) {
            output.writeFieldBegin("alt", thrift.TType.STRING, 13);
            output.writeString(this.alt);
            output.writeFieldEnd();
        }
        if (this.width != null) {
            output.writeFieldBegin("width", thrift.TType.I32, 14);
            output.writeI32(this.width);
            output.writeFieldEnd();
        }
        if (this.height != null) {
            output.writeFieldBegin("height", thrift.TType.I32, 15);
            output.writeI32(this.height);
            output.writeFieldEnd();
        }
        if (this.html != null) {
            output.writeFieldBegin("html", thrift.TType.STRING, 16);
            output.writeString(this.html);
            output.writeFieldEnd();
        }
        if (this.apiUrl != null) {
            output.writeFieldBegin("apiUrl", thrift.TType.STRING, 17);
            output.writeString(this.apiUrl);
            output.writeFieldEnd();
        }
        if (this.photographer != null) {
            output.writeFieldBegin("photographer", thrift.TType.STRING, 18);
            output.writeString(this.photographer);
            output.writeFieldEnd();
        }
        if (this.dateCreated != null) {
            output.writeFieldBegin("dateCreated", thrift.TType.STRUCT, 19);
            this.dateCreated.write(output);
            output.writeFieldEnd();
        }
        if (this.youtubeUrl != null) {
            output.writeFieldBegin("youtubeUrl", thrift.TType.STRING, 20);
            output.writeString(this.youtubeUrl);
            output.writeFieldEnd();
        }
        if (this.youtubeSource != null) {
            output.writeFieldBegin("youtubeSource", thrift.TType.STRING, 21);
            output.writeString(this.youtubeSource);
            output.writeFieldEnd();
        }
        if (this.youtubeTitle != null) {
            output.writeFieldBegin("youtubeTitle", thrift.TType.STRING, 22);
            output.writeString(this.youtubeTitle);
            output.writeFieldEnd();
        }
        if (this.youtubeDescription != null) {
            output.writeFieldBegin("youtubeDescription", thrift.TType.STRING, 23);
            output.writeString(this.youtubeDescription);
            output.writeFieldEnd();
        }
        if (this.youtubeAuthorName != null) {
            output.writeFieldBegin("youtubeAuthorName", thrift.TType.STRING, 24);
            output.writeString(this.youtubeAuthorName);
            output.writeFieldEnd();
        }
        if (this.youtubeHtml != null) {
            output.writeFieldBegin("youtubeHtml", thrift.TType.STRING, 25);
            output.writeString(this.youtubeHtml);
            output.writeFieldEnd();
        }
        if (this.role != null) {
            output.writeFieldBegin("role", thrift.TType.STRING, 26);
            output.writeString(this.role);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): WitnessElementFields {
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
                        _args.url = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.originalUrl = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRING) {
                        const value_3: string = input.readString();
                        _args.witnessEmbedType = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_4: string = input.readString();
                        _args.mediaId = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.source = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.STRING) {
                        const value_6: string = input.readString();
                        _args.title = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.STRING) {
                        const value_7: string = input.readString();
                        _args.description = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_8: string = input.readString();
                        _args.authorName = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.STRING) {
                        const value_9: string = input.readString();
                        _args.authorUsername = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.TType.STRING) {
                        const value_10: string = input.readString();
                        _args.authorWitnessProfileUrl = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.TType.STRING) {
                        const value_11: string = input.readString();
                        _args.authorGuardianProfileUrl = value_11;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 12:
                    if (fieldType === thrift.TType.STRING) {
                        const value_12: string = input.readString();
                        _args.caption = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 13:
                    if (fieldType === thrift.TType.STRING) {
                        const value_13: string = input.readString();
                        _args.alt = value_13;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 14:
                    if (fieldType === thrift.TType.I32) {
                        const value_14: number = input.readI32();
                        _args.width = value_14;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 15:
                    if (fieldType === thrift.TType.I32) {
                        const value_15: number = input.readI32();
                        _args.height = value_15;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 16:
                    if (fieldType === thrift.TType.STRING) {
                        const value_16: string = input.readString();
                        _args.html = value_16;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 17:
                    if (fieldType === thrift.TType.STRING) {
                        const value_17: string = input.readString();
                        _args.apiUrl = value_17;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 18:
                    if (fieldType === thrift.TType.STRING) {
                        const value_18: string = input.readString();
                        _args.photographer = value_18;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 19:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_19: CapiDateTime.CapiDateTime = CapiDateTime.CapiDateTime.read(input);
                        _args.dateCreated = value_19;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 20:
                    if (fieldType === thrift.TType.STRING) {
                        const value_20: string = input.readString();
                        _args.youtubeUrl = value_20;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 21:
                    if (fieldType === thrift.TType.STRING) {
                        const value_21: string = input.readString();
                        _args.youtubeSource = value_21;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 22:
                    if (fieldType === thrift.TType.STRING) {
                        const value_22: string = input.readString();
                        _args.youtubeTitle = value_22;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 23:
                    if (fieldType === thrift.TType.STRING) {
                        const value_23: string = input.readString();
                        _args.youtubeDescription = value_23;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 24:
                    if (fieldType === thrift.TType.STRING) {
                        const value_24: string = input.readString();
                        _args.youtubeAuthorName = value_24;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 25:
                    if (fieldType === thrift.TType.STRING) {
                        const value_25: string = input.readString();
                        _args.youtubeHtml = value_25;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 26:
                    if (fieldType === thrift.TType.STRING) {
                        const value_26: string = input.readString();
                        _args.role = value_26;
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
        return new WitnessElementFields(_args);
    }
}
