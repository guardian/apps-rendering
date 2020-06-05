// ----- Imports ----- //

import {TProtocol, TCompactProtocol, TBufferedTransport} from 'thrift';
import { ContentSerde } from '@guardian/content-api-models/v1/content';
import { ItemResponseSerde } from '@guardian/content-api-models/v1/itemResponse';
import { ErrorResponseSerde } from '@guardian/content-api-models/v1/errorResponse';


// ----- Types ----- //

interface ThriftDecoder<A> {
    read(p: TProtocol): A;
}


// ----- Functions ----- //

const decodeContent = <A>(decoder: ThriftDecoder<A>) => (content: Buffer | undefined): A => {
    const transport = new TBufferedTransport(content);
    const protocol = new TCompactProtocol(transport);

    return decoder.read(protocol);
}

const capiDecoder = decodeContent(ItemResponseSerde);
const errorDecoder = decodeContent(ErrorResponseSerde);
const mapiDecoder = decodeContent(ContentSerde);


// ----- Exports ----- //

export {
    capiDecoder,
    errorDecoder,
    mapiDecoder,
};
