import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';
import { Tag } from 'types/capi-thrift-models';
import { darkModeCss, articleWidthStyles, getPillarStyles } from 'styles';
import { palette, wide } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/Keyline';
import { Reader } from 'types/Reader';
import { Env } from 'server';
import { isFeature } from 'utils/capi';
import { fromNullable } from 'types/Option';
import { isImage } from 'components/blocks/image';

const MainStyles = css`
    background: ${palette.neutral[97]};
`;

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral[10]};
`;

const BorderStyles = css`
    background: ${palette.neutral[100]};

    ${wide} {
        width: 1300px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${wide} {
            margin: 0 auto;
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Article({ capi }: { capi: any }): Reader<Env, JSX.Element> {

    const { type, fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const [series] = tags.filter((tag: Tag) => tag.type === 'series');
    const feature = isFeature(tags) || 'starRating' in fields;
    const pillarStyles = getPillarStyles(pillarId);
    const contributors = tags.filter((tag: Tag) => tag.type === 'contributor');
    const bodyElements = type === 'liveblog' ? blocks.body : blocks.body[0].elements;
    const mainImage = fromNullable(blocks.main.elements.filter(isImage)[0]);

    return HeaderImage({ image: mainImage, className: HeaderImageStyles })
        .andThen(headerImage =>
            ArticleByline({
                byline: fields.bylineHtml,
                pillarStyles,
                publicationDate: webPublicationDate,
                contributors,
            }).andThen(byline =>
                ArticleBody({ pillarStyles, bodyElements }).map(body =>
                    // This is not an iterator, ESLint is confused
                    // eslint-disable-next-line react/jsx-key
                    <main css={[MainStyles, MainDarkStyles]}>
                    <div css={BorderStyles}>
                        { headerImage }
                        <div css={articleWidthStyles}>
                            <ArticleSeries series={series} pillarStyles={pillarStyles}/>
                            <ArticleHeadline
                                headline={fields.headline}
                                feature={feature}
                                rating={fields.starRating}
                                pillarStyles={pillarStyles}
                            />
                            <ArticleStandfirst
                                standfirst={fields.standfirst}
                                feature={feature}
                                pillarStyles={pillarStyles}
                            />
                        </div>
                        <Keyline pillar={pillarId} type={'article'}/>
                        <div css={articleWidthStyles}>
                            { byline }
                            { body }
                            <Tags tags={tags}/>
                        </div>
                    </div>
                </main>
                )
            )
        );
}

export default Article;
