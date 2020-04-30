// ----- Imports ----- //

import { IBlock as Block } from 'mapiThriftModels/Block';
import { Option } from 'types/option';
import { Result } from 'types/result';
import DocParser from 'types/docParser';
import { BodyElement, parseElements } from 'bodyElement';
import { maybeCapiDate } from 'capi';


// ----- Types ----- //

type Body =
    Result<string, BodyElement>[];

type LiveBlock = {
    id: string;
    isKeyEvent: boolean;
    title: string;
    firstPublished: Option<Date>;
    lastModified: Option<Date>;
    body: Body;
}


// ----- Functions ----- //

const parse = (docParser: DocParser) => (block: Block): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block?.attributes?.keyEvent ?? false,
        title: block?.title ?? "",
        firstPublished: maybeCapiDate(block?.firstPublishedDate),
        lastModified: maybeCapiDate(block?.lastModifiedDate),
        body: parseElements(docParser)(block.elements),
    })

const parseLiveBlocks = (docParser: DocParser) => (blocks: Block[]): LiveBlock[] =>
    blocks.map(parse(docParser));


// ----- Exports ----- //

export {
    Body,
    LiveBlock,
    parseLiveBlocks,
};
