// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content } from 'mapiThriftModels/Content';
import { ElementType } from 'mapiThriftModels/ElementType';
import { BlockElement } from 'mapiThriftModels/BlockElement';
import { Tag } from 'mapiThriftModels/Tag';
import { isFeature, isAnalysis, isImmersive, isReview, articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable } from 'types/option';
import { Err, Ok, Result } from 'types/result';


// ----- Types ----- //

const enum Layout {
    Standard,
    Immersive,
    Feature,
    Review,
    Analysis,
    Opinion,
    Liveblog,
    Gallery,
    Interactive,
    Picture,
    Video,
    Audio,
}

type Article = {
    layout: Layout;
    pillar: Pillar;
    headline: string;
    standfirst: DocumentFragment;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    publishDate: string;
    mainImage: Option<BlockElement>;
    contributors: Tag[];
    series: Tag;
    commentable: boolean;
    starRating: Option<number>;
    blocks: Result<string, Block>[];
    tags: Tag[];
};

type Block = {
    kind: ElementType.TEXT;
    doc: DocumentFragment;
} | {
    kind: ElementType.IMAGE;
    alt: string;
    caption: string;
    displayCredit: boolean;
    credit: string;
    file: string;
    width: number;
    height: number;
} | {
    kind: ElementType.PULLQUOTE;
    quote: string;
    attribution: Option<string>;
} | {
    kind: ElementType.INTERACTIVE;
    url: string;
} | {
    kind: ElementType.RICH_LINK;
    url: string;
    linkText: string;
} | {
    kind: ElementType.TWEET;
    content: NodeList;
};

type DocParser = (html: string) => DocumentFragment;


// ----- Functions ----- //

const tweetContent = (tweetId: string, doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet with id: ${tweetId}`);
}

const parseBlock = (docParser: DocParser) => (block: BlockElement): Result<string, Block> => {
    switch (block.type) {

        case ElementType.TEXT:
            return new Ok({ kind: ElementType.TEXT, doc: docParser(block.textTypeData.html) });

        case ElementType.IMAGE:

            const masterAsset = block.assets.find(asset => asset.typeData.isMaster);
            const { alt, caption, displayCredit, credit } = block.imageTypeData;
            const imageBlock: Option<Result<string, Block>> = fromNullable(masterAsset)
                .map(asset => new Ok({
                    kind: ElementType.IMAGE,
                    alt,
                    caption,
                    displayCredit,
                    credit,
                    file: asset.file,
                    width: asset.typeData.width,
                    height: asset.typeData.height,
                }));

            return imageBlock.withDefault(new Err('I couldn\'t find a master asset'));

        case ElementType.PULLQUOTE:

            const { html: quote, attribution } = block.pullquoteTypeData;
            return new Ok({
                kind: ElementType.PULLQUOTE,
                quote,
                attribution: fromNullable(attribution),
            });

        case ElementType.INTERACTIVE:
            const { iframeUrl } = block.interactiveTypeData;
            return new Ok({ kind: ElementType.INTERACTIVE, url: iframeUrl });

        case ElementType.RICH_LINK:

            const { url, linkText } = block.richLinkTypeData;
            return new Ok({ kind: ElementType.RICH_LINK, url, linkText });

        case ElementType.TWEET:
            return tweetContent(block.tweetTypeData.id, docParser(block.tweetTypeData.html))
                .map(content => ({ kind: ElementType.TWEET, content }));

        default:
            return new Err(`I'm afraid I don't understand the block I was given: ${block.type}`);
    }
}

const parseBlocks = (docParser: DocParser) => (blocks: BlockElement[]): Result<string, Block>[] =>
    blocks.map(parseBlock(docParser));

function parseLayout(content: Content): Layout {
    switch (content.type) {
        case 'article':
            if (pillarFromString(content.pillarId) === Pillar.opinion) {
                return Layout.Opinion;
            } else if (isImmersive(content)) {
                return Layout.Immersive;
            } else if (isFeature(content)) {
                return Layout.Feature;
            } else if (isReview(content)) {
                return Layout.Review;
            } else if (isAnalysis(content)) {
                return Layout.Analysis;
            }
            return Layout.Standard;
        case 'liveblog':
            return Layout.Liveblog;
        case 'gallery':
            return Layout.Gallery;
        case 'interactive':
            return Layout.Interactive;
        case 'picture':
            return Layout.Picture;
        case 'video':
            return Layout.Video;
        case 'audio':
            return Layout.Audio;
        default:
            return Layout.Standard;
    }    
}

const fromCapi = (docParser: DocParser) => (content: Content): Article =>
    ({
        layout: parseLayout(content),
        pillar: pillarFromString(content.pillarId),
        headline: content.fields.headline,
        standfirst: docParser(content.fields.standfirst),
        byline: content.fields.byline,
        bylineHtml: fromNullable(content.fields.bylineHtml).map(docParser),
        publishDate: content.webPublicationDate,
        mainImage: articleMainImage(content),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content.fields.commentable,
        starRating: fromNullable(content.fields.starRating),
        blocks: parseBlocks(docParser)(content.blocks.body[0].elements),
        tags: content.tags,
    });


// ----- Exports ----- //

export {
    Article,
    Layout,
    Block,
    fromCapi,
};
