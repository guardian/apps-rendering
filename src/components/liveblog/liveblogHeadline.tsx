import React from 'react';
import { basePx, headlineFont } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';

const LiveblogHeadlineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    padding: ${basePx(0, 0, 4, 0)};
    background: ${kicker};
    h1 {
        font-size: 2.8rem;
        line-height: 3.2rem;
        margin: 0;
        ${headlineFont}
        font-weight: 500;
        color: ${palette.neutral[100]};
    }
`;

interface LiveblogHeadlineProps {
    headline: string;
    pillarStyles: PillarStyles;
}

const LiveblogHeadline = ({ headline, pillarStyles }: LiveblogHeadlineProps): JSX.Element =>
    <LeftColumn className={LiveblogHeadlineStyles(pillarStyles)}>
        <h1>{ headline }</h1>
    </LeftColumn>

export default LiveblogHeadline;
