/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as Content from "./Content";
export interface ISearchResponseArgs {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: Array<Content.Content>;
}
export class SearchResponse {
    public status: string;
    public userTier: string;
    public total: number;
    public startIndex: number;
    public pageSize: number;
    public currentPage: number;
    public pages: number;
    public orderBy: string;
    public results: Array<Content.Content>;
    constructor(args: ISearchResponseArgs) {
        if (args != null && args.status != null) {
            this.status = args.status;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[status] is unset!");
        }
        if (args != null && args.userTier != null) {
            this.userTier = args.userTier;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[userTier] is unset!");
        }
        if (args != null && args.total != null) {
            this.total = args.total;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[total] is unset!");
        }
        if (args != null && args.startIndex != null) {
            this.startIndex = args.startIndex;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[startIndex] is unset!");
        }
        if (args != null && args.pageSize != null) {
            this.pageSize = args.pageSize;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[pageSize] is unset!");
        }
        if (args != null && args.currentPage != null) {
            this.currentPage = args.currentPage;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[currentPage] is unset!");
        }
        if (args != null && args.pages != null) {
            this.pages = args.pages;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[pages] is unset!");
        }
        if (args != null && args.orderBy != null) {
            this.orderBy = args.orderBy;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[orderBy] is unset!");
        }
        if (args != null && args.results != null) {
            this.results = args.results;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[results] is unset!");
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("SearchResponse");
        if (this.status != null) {
            output.writeFieldBegin("status", thrift.TType.STRING, 1);
            output.writeString(this.status);
            output.writeFieldEnd();
        }
        if (this.userTier != null) {
            output.writeFieldBegin("userTier", thrift.TType.STRING, 2);
            output.writeString(this.userTier);
            output.writeFieldEnd();
        }
        if (this.total != null) {
            output.writeFieldBegin("total", thrift.TType.I32, 3);
            output.writeI32(this.total);
            output.writeFieldEnd();
        }
        if (this.startIndex != null) {
            output.writeFieldBegin("startIndex", thrift.TType.I32, 4);
            output.writeI32(this.startIndex);
            output.writeFieldEnd();
        }
        if (this.pageSize != null) {
            output.writeFieldBegin("pageSize", thrift.TType.I32, 5);
            output.writeI32(this.pageSize);
            output.writeFieldEnd();
        }
        if (this.currentPage != null) {
            output.writeFieldBegin("currentPage", thrift.TType.I32, 6);
            output.writeI32(this.currentPage);
            output.writeFieldEnd();
        }
        if (this.pages != null) {
            output.writeFieldBegin("pages", thrift.TType.I32, 7);
            output.writeI32(this.pages);
            output.writeFieldEnd();
        }
        if (this.orderBy != null) {
            output.writeFieldBegin("orderBy", thrift.TType.STRING, 8);
            output.writeString(this.orderBy);
            output.writeFieldEnd();
        }
        if (this.results != null) {
            output.writeFieldBegin("results", thrift.TType.LIST, 9);
            output.writeListBegin(thrift.TType.STRUCT, this.results.length);
            this.results.forEach((value_1: Content.Content): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): SearchResponse {
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
                        const value_2: string = input.readString();
                        _args.status = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_3: string = input.readString();
                        _args.userTier = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.I32) {
                        const value_4: number = input.readI32();
                        _args.total = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.I32) {
                        const value_5: number = input.readI32();
                        _args.startIndex = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.I32) {
                        const value_6: number = input.readI32();
                        _args.pageSize = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.I32) {
                        const value_7: number = input.readI32();
                        _args.currentPage = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.I32) {
                        const value_8: number = input.readI32();
                        _args.pages = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_9: string = input.readString();
                        _args.orderBy = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.LIST) {
                        const value_10: Array<Content.Content> = new Array<Content.Content>();
                        const metadata_1: thrift.IThriftList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_11: Content.Content = Content.Content.read(input);
                            value_10.push(value_11);
                        }
                        input.readListEnd();
                        _args.results = value_10;
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
        if (_args.status !== undefined && _args.userTier !== undefined && _args.total !== undefined && _args.startIndex !== undefined && _args.pageSize !== undefined && _args.currentPage !== undefined && _args.pages !== undefined && _args.orderBy !== undefined && _args.results !== undefined) {
            return new SearchResponse(_args);
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read SearchResponse from input");
        }
    }
}
