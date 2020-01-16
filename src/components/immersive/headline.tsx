// ----- Imports ----- //

import React from 'react';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

import { basePx, headlineFont, darkModeCss, headlineFontStyles } from 'styles';


// ----- Styles ----- //

const Styles = css`
    padding: ${basePx(.5, 1, 3, 1)};
    background: ${palette.neutral[7]};
    position: relative;
    margin-top: -78px;

    ${headlineFont}

    h1 {
        font-weight: 700;
        ${headlineFontStyles}
        color: ${palette.neutral[100]};
    }
`;

const DarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};
`;


// ----- Component ----- //

interface Props {
    headline: string;
}

const Headline = ({ headline }: Props): JSX.Element =>
    <div css={[Styles, DarkStyles]}>
        <h1>{headline}</h1>
    </div>


// ----- Exports ----- //

export default Headline;
