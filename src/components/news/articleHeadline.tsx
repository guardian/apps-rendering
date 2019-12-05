import React from 'react';
import ArticleRating from './articleRating';
import { basePx, sidePadding, headlineFont, darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { PillarStyles } from 'pillar';

const HeadlineStyles = (feature: boolean, { featureHeadline }: PillarStyles): SerializedStyles => css`
    padding: ${basePx(0, 0, 4, 0)};
    h1 {
        font-size: 2.8rem;
        line-height: 3.2rem;
        margin: 0;
        ${headlineFont}
        ${sidePadding}
        font-weight: ${feature ? 700 : 500};
        color: ${feature ? featureHeadline : palette.neutral[7]};
    }
`;

const HeadlineDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};
`;

interface ArticleHeadlineProps {
    headline: string;
    feature: boolean;
    pillarStyles: PillarStyles;
    rating?: string;
}

const ArticleHeadline = ({
    headline,
    feature,
    pillarStyles,
    rating,
}: ArticleHeadlineProps): JSX.Element =>
    <div css={[HeadlineStyles(feature, pillarStyles), HeadlineDarkStyles]}>
        <h1>{headline}</h1>
        { rating ? <ArticleRating rating={rating} /> : null }
    </div>

export default ArticleHeadline;
