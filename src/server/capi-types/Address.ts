/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IAddress {
    formattedAddress?: string;
    streetNumber?: number;
    streetName?: string;
    neighbourhood?: string;
    postTown?: string;
    locality?: string;
    country?: string;
    administrativeAreaLevelOne?: string;
    administrativeAreaLevelTwo?: string;
    postCode?: string;
}
export interface IAddressArgs {
    formattedAddress?: string;
    streetNumber?: number;
    streetName?: string;
    neighbourhood?: string;
    postTown?: string;
    locality?: string;
    country?: string;
    administrativeAreaLevelOne?: string;
    administrativeAreaLevelTwo?: string;
    postCode?: string;
}
export const AddressCodec: thrift.IStructCodec<IAddressArgs, IAddress> = {
    encode(args: IAddressArgs, output: thrift.TProtocol): void {
        const obj: any = {
            formattedAddress: args.formattedAddress,
            streetNumber: args.streetNumber,
            streetName: args.streetName,
            neighbourhood: args.neighbourhood,
            postTown: args.postTown,
            locality: args.locality,
            country: args.country,
            administrativeAreaLevelOne: args.administrativeAreaLevelOne,
            administrativeAreaLevelTwo: args.administrativeAreaLevelTwo,
            postCode: args.postCode
        };
        output.writeStructBegin("Address");
        if (obj.formattedAddress != null) {
            output.writeFieldBegin("formattedAddress", thrift.TType.STRING, 1);
            output.writeString(obj.formattedAddress);
            output.writeFieldEnd();
        }
        if (obj.streetNumber != null) {
            output.writeFieldBegin("streetNumber", thrift.TType.I16, 2);
            output.writeI16(obj.streetNumber);
            output.writeFieldEnd();
        }
        if (obj.streetName != null) {
            output.writeFieldBegin("streetName", thrift.TType.STRING, 3);
            output.writeString(obj.streetName);
            output.writeFieldEnd();
        }
        if (obj.neighbourhood != null) {
            output.writeFieldBegin("neighbourhood", thrift.TType.STRING, 4);
            output.writeString(obj.neighbourhood);
            output.writeFieldEnd();
        }
        if (obj.postTown != null) {
            output.writeFieldBegin("postTown", thrift.TType.STRING, 5);
            output.writeString(obj.postTown);
            output.writeFieldEnd();
        }
        if (obj.locality != null) {
            output.writeFieldBegin("locality", thrift.TType.STRING, 6);
            output.writeString(obj.locality);
            output.writeFieldEnd();
        }
        if (obj.country != null) {
            output.writeFieldBegin("country", thrift.TType.STRING, 7);
            output.writeString(obj.country);
            output.writeFieldEnd();
        }
        if (obj.administrativeAreaLevelOne != null) {
            output.writeFieldBegin("administrativeAreaLevelOne", thrift.TType.STRING, 8);
            output.writeString(obj.administrativeAreaLevelOne);
            output.writeFieldEnd();
        }
        if (obj.administrativeAreaLevelTwo != null) {
            output.writeFieldBegin("administrativeAreaLevelTwo", thrift.TType.STRING, 9);
            output.writeString(obj.administrativeAreaLevelTwo);
            output.writeFieldEnd();
        }
        if (obj.postCode != null) {
            output.writeFieldBegin("postCode", thrift.TType.STRING, 10);
            output.writeString(obj.postCode);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IAddress {
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
                        _args.formattedAddress = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.I16) {
                        const value_2: number = input.readI16();
                        _args.streetNumber = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRING) {
                        const value_3: string = input.readString();
                        _args.streetName = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_4: string = input.readString();
                        _args.neighbourhood = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.postTown = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.STRING) {
                        const value_6: string = input.readString();
                        _args.locality = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.STRING) {
                        const value_7: string = input.readString();
                        _args.country = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_8: string = input.readString();
                        _args.administrativeAreaLevelOne = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.STRING) {
                        const value_9: string = input.readString();
                        _args.administrativeAreaLevelTwo = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.TType.STRING) {
                        const value_10: string = input.readString();
                        _args.postCode = value_10;
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
        return {
            formattedAddress: _args.formattedAddress,
            streetNumber: _args.streetNumber,
            streetName: _args.streetName,
            neighbourhood: _args.neighbourhood,
            postTown: _args.postTown,
            locality: _args.locality,
            country: _args.country,
            administrativeAreaLevelOne: _args.administrativeAreaLevelOne,
            administrativeAreaLevelTwo: _args.administrativeAreaLevelTwo,
            postCode: _args.postCode
        };
    }
};
export class Address extends thrift.StructLike implements IAddress {
    public formattedAddress?: string;
    public streetNumber?: number;
    public streetName?: string;
    public neighbourhood?: string;
    public postTown?: string;
    public locality?: string;
    public country?: string;
    public administrativeAreaLevelOne?: string;
    public administrativeAreaLevelTwo?: string;
    public postCode?: string;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IAddressArgs = {}) {
        super();
        if (args.formattedAddress != null) {
            const value_11: string = args.formattedAddress;
            this.formattedAddress = value_11;
        }
        if (args.streetNumber != null) {
            const value_12: number = args.streetNumber;
            this.streetNumber = value_12;
        }
        if (args.streetName != null) {
            const value_13: string = args.streetName;
            this.streetName = value_13;
        }
        if (args.neighbourhood != null) {
            const value_14: string = args.neighbourhood;
            this.neighbourhood = value_14;
        }
        if (args.postTown != null) {
            const value_15: string = args.postTown;
            this.postTown = value_15;
        }
        if (args.locality != null) {
            const value_16: string = args.locality;
            this.locality = value_16;
        }
        if (args.country != null) {
            const value_17: string = args.country;
            this.country = value_17;
        }
        if (args.administrativeAreaLevelOne != null) {
            const value_18: string = args.administrativeAreaLevelOne;
            this.administrativeAreaLevelOne = value_18;
        }
        if (args.administrativeAreaLevelTwo != null) {
            const value_19: string = args.administrativeAreaLevelTwo;
            this.administrativeAreaLevelTwo = value_19;
        }
        if (args.postCode != null) {
            const value_20: string = args.postCode;
            this.postCode = value_20;
        }
    }
    public static read(input: thrift.TProtocol): Address {
        return new Address(AddressCodec.decode(input));
    }
    public static write(args: IAddressArgs, output: thrift.TProtocol): void {
        return AddressCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return AddressCodec.encode(this, output);
    }
}
