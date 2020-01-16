// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content } from './server/capi-types/Content';
import { ElementType } from './server/capi-types/ElementType';
import { BlockElement } from './server/capi-types/BlockElement';
import { Tag } from './server/capi-types/Tag';
import { isFeature, isAnalysis, isImmersive, isReview, articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable } from 'types/option';
import { Err, Ok, Result } from 'types/result';
import { ContentType } from 'server/capi-types/ContentType';

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

const tweetContent = (doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet`);
}

const parseBlock = (docParser: DocParser) => (block: BlockElement): Result<string, Block> => {
    switch (block.type) {

        case ElementType.TEXT:
            return new Ok({ kind: ElementType.TEXT, doc: docParser(block?.textTypeData?.html ?? "") });

        case ElementType.IMAGE:

            const masterAsset = block.assets.find(asset => asset?.typeData?.isMaster);
            const { alt, caption, displayCredit, credit } = block?.imageTypeData || {};
            if (!masterAsset) return new Err("I couldn\'t find a master asset")
            return new Ok({
                    kind: ElementType.IMAGE,
                    alt: alt ?? "",
                    caption: caption ?? "",
                    displayCredit: displayCredit ?? false,
                    credit: credit ?? "",
                    file: masterAsset.file ?? "",
                    width: masterAsset.typeData?.width ?? 0,
                    height: masterAsset.typeData?.height ?? 0,
                })

        case ElementType.PULLQUOTE:

            const { html: quote, attribution } = block.pullquoteTypeData || {};
            if (!quote) return new Err("Missing quote from pullquoteTypeData block");
            return new Ok({
                kind: ElementType.PULLQUOTE,
                quote,
                attribution: fromNullable(attribution),
            });

        case ElementType.INTERACTIVE:
            const { iframeUrl } = block.interactiveTypeData || {};
            if (!iframeUrl) return new Err("No iframeUrl for interactive block")
            return new Ok({ kind: ElementType.INTERACTIVE, url: iframeUrl });

        case ElementType.RICH_LINK:

            const { url, linkText } = block.richLinkTypeData || {};
            if (!url) return new Err("No url for rich link block")
            if (!linkText) return new Err("No linkText for rich link block")
            return new Ok({ kind: ElementType.RICH_LINK, url, linkText });

        case ElementType.TWEET:
            const { html } = block.tweetTypeData || {};
            if (!html) return new Err("No html for tweet block")
            return tweetContent(docParser(html))
                .map(content => ({ kind: ElementType.TWEET, content }));

        default:
            return new Err(`I'm afraid I don't understand the block I was given: ${block.type}`);
    }
}

const parseBlocks = (docParser: DocParser) => (blocks: BlockElement[] | undefined): Result<string, Block>[] => {
    if (!blocks) return [new Err("Undefined blocks in parseBlocks")];
    return blocks.map(parseBlock(docParser));
}

function parseLayout(content: Content): Layout {
    switch (content.type) {
        case ContentType.ARTICLE:
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
        case ContentType.LIVEBLOG:
            return Layout.Liveblog;
        case ContentType.GALLERY:
            return Layout.Gallery;
        case ContentType.INTERACTIVE:
            return Layout.Interactive;
        case ContentType.PICTURE:
            return Layout.Picture;
        case ContentType.VIDEO:
            return Layout.Video;
        case ContentType.AUDIO:
            return Layout.Audio;
        default:
            return Layout.Standard;
    }    
}

const fromCapi = (docParser: DocParser) => (content: Content): Article => {
    const body = content?.blocks?.body;
    const elements = body?.length ? body[0].elements : new Err("No body elements on block");
    return ({
        layout: parseLayout(content),
        pillar: pillarFromString(content.pillarId ?? 'pillar/news'),
        headline: content?.fields?.headline ?? "",
        standfirst: docParser(content?.fields?.standfirst ?? ""),
        byline: content?.fields?.byline ?? "",
        bylineHtml: fromNullable(content?.fields?.bylineHtml ?? "").map(docParser),
        publishDate: content?.webPublicationDate?.iso8601 ?? "",
        mainImage: articleMainImage(content),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content?.fields?.commentable ?? false,
        starRating: fromNullable(content?.fields?.starRating),
        blocks: parseBlocks(docParser)(elements),
        tags: content.tags,
    });
}


// ----- Exports ----- //

export {
    Article,
    Layout,
    Block,
    fromCapi,
};
