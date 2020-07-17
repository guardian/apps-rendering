// ----- Imports ----- //

import { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { BlockElement} from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime'
import { Option, fromNullable, andThen, none, some, map } from '@guardian/types/option';
import { fromString as dateFromString } from 'date';
import { Context } from 'types/parserContext';
import { parseImage } from 'image';
import { parseVideo } from 'video';
import { MainMediaKind, MainMedia } from 'headerMedia';
import { pipe2 } from 'lib';


// ----- Lookups ----- //

interface Series {
    webTitle?: string;
    webUrl?: string;
}

interface Logo {
    src: string;
    url: string;
    alt: string;
}

const tagsOfType = (tagType: TagType) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === tagType);

const isImmersive = (content: Content): boolean =>
    content?.fields?.displayHint === 'immersive';

const isInteractive = (content: Content): boolean =>
    content.type === ContentType.INTERACTIVE;

const isPhotoEssay = (content: Content): boolean =>
    content?.fields?.displayHint === 'photoEssay';

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

const isReview = (content: Content): boolean =>
    [0,1,2,3,4,5].includes(content?.fields?.starRating ?? -1)

const isAnalysis = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/analysis');

const articleSeries = (content: Content): Option<Tag> =>
    fromNullable(tagsOfType(TagType.SERIES)(content.tags)[0]);

const articleContributors = (content: Content): Tag[] =>
    tagsOfType(TagType.CONTRIBUTOR)(content.tags);

const isImage = (elem: BlockElement): boolean =>
    elem.type === ElementType.IMAGE;

const isVideo = (elem: BlockElement): boolean =>
    elem.type === ElementType.CONTENTATOM &&
    elem.contentAtomTypeData?.atomType === "media";

const articleMainImage = (content: Content): Option<BlockElement> =>
    fromNullable((content?.blocks?.main?.elements.filter(isImage) ?? [])[0]);

const articleMainVideo = (content: Content): Option<BlockElement> =>
    fromNullable((content?.blocks?.main?.elements.filter(isVideo) ?? [])[0]);

const articleMainMedia = (content: Content, context: Context): Option<MainMedia> => {
    return (content?.blocks?.main?.elements.filter(isImage) ?? [])[0]
        ? pipe2(
            articleMainImage(content),
            andThen(parseImage(context)),
            map(image => ({
                kind: MainMediaKind.Image,
                image
            })))
        : pipe2(
            articleMainVideo(content),
            andThen(blockElement => parseVideo(blockElement, content.atoms)),
            map(video => ({
                kind: MainMediaKind.Video,
                video
            })))
}

const includesTweets = (content: Content): boolean => {
    const body = content?.blocks?.body;

    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.TWEET))
        .some(Boolean)
}

const paidContentLogo = (tags: Tag[]): Option<Logo> => {
    const sponsorship = tags
        .find(tag => tag.type === TagType.PAID_CONTENT)?.activeSponsorships?.pop();
    const src = sponsorship?.sponsorLogo;
    const url = sponsorship?.sponsorLink;
    const alt = sponsorship?.sponsorName ?? "";
    return (!src || !url)
        ? none
        : some({ src, url, alt })
}


// ----- Functions ----- //

const capiEndpoint = (articleId: string, key: string): string => {
    // If you need a new field here, MAPI probably also needs updating
    const fields = [
        'headline',
        'standfirst',
        'bylineHtml',
        'firstPublicationDate',
        'shouldHideAdverts',
        'shouldHideReaderRevenue',
        'displayHint',
        'starRating',
        'commentable'
    ];

    const params = new URLSearchParams({
      format: 'thrift',
      'api-key': key,
      'show-atoms': 'all',
      'show-fields': fields.join(','),
      'show-tags': 'all',
      'show-blocks': 'all',
      'show-elements': 'all',
    })
  
    return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
}

const capiDateTimeToDate = (date: CapiDateTime): Option<Date> =>
    // Thrift definitions define some dates as CapiDateTime but CAPI returns strings
    dateFromString(date.iso8601);

const maybeCapiDate = (date: CapiDateTime | undefined): Option<Date> =>
    pipe2(date, fromNullable, andThen(capiDateTimeToDate));


// ----- Exports ----- //

export {
    Series,
    Logo,
    isPhotoEssay,
    isImmersive,
    isInteractive,
    isFeature,
    isReview,
    isAnalysis,
    articleSeries,
    articleContributors,
    articleMainMedia,
    capiEndpoint,
    includesTweets,
    maybeCapiDate,
    paidContentLogo,
};
