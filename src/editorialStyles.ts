// ----- Imports ----- //

import { SerializedStyles, css } from '@emotion/core';

import { compose } from 'lib';
import { Colour, headlineFont, headlineBackground } from 'editorialPalette';


// ----- Functions ----- //

const fontColour = (colour: Colour): SerializedStyles =>
    css`
        color: ${colour.light};

        @media (prefers-color-scheme: dark) {
            color: ${colour.dark};
        }
    `;

const backgroundColour = (colour: Colour): SerializedStyles =>
    css`
        background-color: ${colour.light};

        @media (prefers-color-scheme: dark) {
            background-color: ${colour.dark};
        }
    `;

const headlineFontColour = compose(fontColour, headlineFont);
const headlineBackgroundColour = compose(backgroundColour, headlineBackground);


// ----- Exports ----- //

export {
    headlineFontColour,
    headlineBackgroundColour,
};
