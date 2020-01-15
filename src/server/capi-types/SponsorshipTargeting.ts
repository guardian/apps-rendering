/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as CapiDateTime from "./CapiDateTime";
export interface ISponsorshipTargetingArgs {
    publishedSince?: CapiDateTime.CapiDateTime;
    validEditions?: Array<string>;
}
export class SponsorshipTargeting {
    public publishedSince?: CapiDateTime.CapiDateTime;
    public validEditions?: Array<string>;
    constructor(args?: ISponsorshipTargetingArgs) {
        if (args != null && args.publishedSince != null) {
            this.publishedSince = args.publishedSince;
        }
        if (args != null && args.validEditions != null) {
            this.validEditions = args.validEditions;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("SponsorshipTargeting");
        if (this.publishedSince != null) {
            output.writeFieldBegin("publishedSince", thrift.TType.STRUCT, 1);
            this.publishedSince.write(output);
            output.writeFieldEnd();
        }
        if (this.validEditions != null) {
            output.writeFieldBegin("validEditions", thrift.TType.LIST, 2);
            output.writeListBegin(thrift.TType.STRING, this.validEditions.length);
            this.validEditions.forEach((value_1: string): void => {
                output.writeString(value_1);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): SponsorshipTargeting {
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
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_2: CapiDateTime.CapiDateTime = CapiDateTime.CapiDateTime.read(input);
                        _args.publishedSince = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.LIST) {
                        const value_3: Array<string> = new Array<string>();
                        const metadata_1: thrift.IThriftList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_4: string = input.readString();
                            value_3.push(value_4);
                        }
                        input.readListEnd();
                        _args.validEditions = value_3;
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
        return new SponsorshipTargeting(_args);
    }
}
