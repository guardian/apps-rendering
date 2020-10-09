// ----- Imports ----- //

import { TProtocol, TCompactProtocol, TBufferedTransport, TTransport } from 'thrift';
import { RenderingRequestSerde } from '@guardian/apps-rendering-api-models/renderingRequest';
import { ItemResponseSerde } from '@guardian/content-api-models/v1/itemResponse';
import { ErrorResponseSerde } from '@guardian/content-api-models/v1/errorResponse';


// ----- Types ----- //

interface ThriftDecoder<A> {
    read(p: TProtocol): A;
}


// ----- Functions ----- //

async function toTransport(buffer: Buffer): Promise<TTransport> {
    return new Promise((resolve, reject) => {
        const writer = TBufferedTransport.receiver((transport, seqID) => {
            resolve(transport)
        }, 0);
        writer(buffer);
    });
}

const decodeContent = <A>(decoder: ThriftDecoder<A>) =>
    async (content: Buffer | undefined): Promise<A> => {
        if (content) {
            const transport = await toTransport(content);
            const protocol = new TCompactProtocol(transport);

            return decoder.read(protocol);
        } else {
            return Promise.reject("Invalid request")
        }
    }

const capiDecoder = decodeContent(ItemResponseSerde);
const errorDecoder = decodeContent(ErrorResponseSerde);
const mapiDecoder = decodeContent(RenderingRequestSerde);


// ----- Exports ----- //

export {
    capiDecoder,
    errorDecoder,
    mapiDecoder,
};
