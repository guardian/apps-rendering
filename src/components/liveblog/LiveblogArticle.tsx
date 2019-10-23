import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBody from './LiveblogBody';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';
import { PillarStyles, wideColumnWidth, baseMultiply, getPillarStyles } from 'styles';
import { Tag } from 'types/capi-thrift-models';
import { css, SerializedStyles } from '@emotion/core'
import { palette, wide } from '@guardian/src-foundations'
import { Env } from 'types/Env';
import { Reader } from 'types/Reader';
import { isImage } from 'components/blocks/image';
import { fromNullable } from 'types/Option';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

const BorderStyles = css`
    ${wide} {
        width: 1200px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${wide} {
        padding-bottom: 12px;
    }

    figure {
        margin: 0;

        ${wide} {
            margin-left: ${wideColumnWidth + baseMultiply(1)}px;
        }
    }
`;

interface LiveblogArticleProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    capi: any;
    isLive: boolean;
}

function LiveblogArticle({ capi }: LiveblogArticleProps): Reader<Env, JSX.Element> {

    const { type, fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const [series] = tags.filter((tag: Tag) => tag.type === 'series');
    const pillarStyles = getPillarStyles(pillarId);
    const contributors = tags.filter((tag: Tag) => tag.type === 'contributor');
    const bodyElements = type === 'liveblog' ? blocks.body : blocks.body[0].elements;
    const image = fromNullable(blocks.main.elements.filter(isImage)[0]);

    const headerImage = HeaderImage({ image, className: HeaderImageStyles(pillarStyles) });
    const liveblogByline = LiveblogByline({
        byline: fields.bylineHtml,
        pillarId,
        publicationDate: webPublicationDate,
        contributors,
    });
    const liveblogBody = LiveblogBody({ bodyElements, pillarStyles });

    return Reader.sequence([ headerImage, liveblogByline, liveblogBody ])
        .map(([ headerImg, byline, body ]) =>
            // This is not an iterator, ESLint is confused
            // eslint-disable-next-line react/jsx-key
            <main css={LiveblogArticleStyles}>
                <div css={BorderStyles}>
                    <LiveblogSeries series={series} pillarStyles={pillarStyles}/>
                    <LiveblogHeadline
                        headline={fields.headline}
                        pillarStyles={pillarStyles}
                    />
                    <LiveblogStandfirst
                        standfirst={fields.standfirst}
                        pillarStyles={pillarStyles}
                    />
                    { byline }
                    { headerImg }
                    <LiveblogKeyEvents
                        bodyElements={bodyElements}
                        pillarStyles={pillarStyles}
                    />
                    { body }
                    <Tags tags={tags} background={palette.neutral[93]}/>
                </div>
            </main>
        );
}

export default LiveblogArticle;
