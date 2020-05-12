// ----- Imports ----- //

import { SerializedStyles, css } from '@emotion/core';

import { compose } from 'lib';
import { Colour, headlineText, headlineBackground } from 'editorialPalette';


// ----- Functions ----- //

const textColour = (colour: Colour): SerializedStyles =>
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

const headlineTextColour = compose(textColour, headlineText);
const headlineBackgroundColour = compose(backgroundColour, headlineBackground);


// ----- Exports ----- //

export {
    headlineTextColour,
    headlineBackgroundColour,
};
