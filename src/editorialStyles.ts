// ----- Imports ----- //

import { SerializedStyles, css } from '@emotion/core';
import { Format } from '@guardian/types/Format';

import { Colour, text, background } from 'editorialPalette';


// ----- Functions ----- //

const textColour = (light: Colour, dark: Colour): SerializedStyles =>
    css`
        color: ${light};

        @media (prefers-color-scheme: dark) {
            color: ${dark};
        }
    `;

const backgroundColour = (light: Colour, dark: Colour): SerializedStyles =>
    css`
        background-color: ${light};

        @media (prefers-color-scheme: dark) {
            background-color: ${dark};
        }
    `;

const headlineTextColour = (format: Format): SerializedStyles =>
    textColour(text.headlinePrimary(format), text.headlineInverse(format));
const headlineBackgroundColour = (format: Format): SerializedStyles =>
    backgroundColour(background.headlinePrimary(format), background.headlineInverse(format));


// ----- Exports ----- //

export {
    headlineTextColour,
    headlineBackgroundColour,
};
