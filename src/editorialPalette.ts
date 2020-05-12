// ----- Imports ----- //

import {
    text,
    background,
    neutral,
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/src-foundations/palette';
import { Format, Design, Display, Pillar } from '@guardian/types/Format';


// ----- Types ----- //

interface Colour {
    light: string;
    dark: string;
}

interface Palette {
    headlineText: Colour;
    headlineBackground: Colour;
    border: Colour;
}


// ----- Functions ----- //

const headlineText = (format: Format): Colour => {
    const light = text.primary;
    const dark = neutral[86];

    if (format.display === Display.Immersive || format.design === Design.Media) {
        return ({ light: neutral[100], dark });
    }

    if (format.design === Design.Feature) {
        switch (format.pillar) {
            case Pillar.Opinion:
                return ({ light: opinion[300], dark });
            case Pillar.Sport:
                return ({ light: sport[300], dark });
            case Pillar.Culture:
                return ({ light: culture[300], dark });
            case Pillar.Lifestyle:
                return ({ light: lifestyle[300], dark });
            case Pillar.News:
            default:
                return ({ light: news[300], dark });
        }
    }

    return { light, dark };
}

const headlineBackground = (format: Format): Colour => {
    const light = background.primary;
    const dark = background.inverse;

    if (format.display === Display.Immersive) {
        return ({ light: neutral[7], dark });
    }

    return { light, dark };
}

const border = (format: Format): Colour => {
    switch (format.pillar) {
        case Pillar.Opinion:
            return ({ light: opinion[400], dark: opinion[400] });
        case Pillar.Sport:
            return ({ light: sport[400], dark: sport[400] });
        case Pillar.Culture:
            return ({ light: culture[400], dark: culture[400] });
        case Pillar.Lifestyle:
            return ({ light: lifestyle[400], dark: lifestyle[400] });
        case Pillar.News:
        default:
            return ({ light: news[400], dark: news[400] });
    }
}

const palette = (format: Format): Palette =>
    ({
        headlineText: headlineText(format),
        headlineBackground: headlineBackground(format),
        border: border(format),
    });


// ----- Exports ----- //

export {
    Colour,
    headlineText,
    headlineBackground,
    border,
    palette,
};
