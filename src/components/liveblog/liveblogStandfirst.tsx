import React from 'react';
import { bulletStyles } from 'styles';
import { transform } from '../../contentTransformations';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';

const StandfirstStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    padding-bottom: 6px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;
    background: ${liveblogBackground};
    color: ${palette.neutral[97]};

    p, ul {
        margin: 0;
    }

    a {
        color: ${palette.neutral[93]};
    }

    ${bulletStyles(liveblogBackground, .4)}
`;

interface LiveblogStandfirstProps {
    standfirst: string;
    pillarStyles: PillarStyles;
}

const LiveblogStandfirst = ({ standfirst, pillarStyles }: LiveblogStandfirstProps): JSX.Element =>
    <LeftColumn className={StandfirstStyles(pillarStyles)}>
        <div dangerouslySetInnerHTML={{__html: transform(standfirst)}} />
    </LeftColumn>

export default LiveblogStandfirst;
