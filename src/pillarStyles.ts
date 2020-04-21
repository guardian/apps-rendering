// ----- Imports ----- //

import * as palette from '@guardian/src-foundations/palette';

import { Pillar } from 'format';


// ----- Types ----- //

interface PillarStyles {
    kicker: string;
    featureHeadline: string;
    soft: string;
    inverted: string;
    liveblogBackground: string;
}

type PillarColours = {
    [ pillar in Pillar ]: PillarStyles;
};

export const pillarColours: PillarColours = {
    [Pillar.News]: {
        kicker: palette.news[400],
        featureHeadline: palette.news[300],
        soft: palette.neutral[97],
        inverted: palette.news[500],
        liveblogBackground: palette.news[300],
    },
    [Pillar.Opinion]: {
        kicker: palette.opinion[300],
        featureHeadline: palette.opinion[200],
        soft: palette.opinion[800],
        inverted: palette.opinion[500],
        liveblogBackground: palette.opinion[200],
    },
    [Pillar.Sport]: {
        kicker: palette.sport[400],
        featureHeadline: palette.sport[300],
        soft: palette.sport[800],
        inverted: palette.sport[500],
        liveblogBackground: palette.sport[300],
    },
    [Pillar.Culture]: {
        kicker: palette.culture[300],
        featureHeadline: palette.culture[200],
        soft: palette.culture[800],
        inverted: palette.culture[500],
        liveblogBackground: palette.culture[200],
    },
    [Pillar.Lifestyle]: {
        kicker: palette.lifestyle[400],
        featureHeadline: palette.lifestyle[300],
        soft: palette.lifestyle[800],
        inverted: palette.lifestyle[500],
        liveblogBackground: palette.lifestyle[300],
    }
}

const getPillarStyles = (pillar: Pillar): PillarStyles => pillarColours[pillar];

function pillarFromString(pillar: string | undefined): Pillar {
    switch (pillar) {
        case 'pillar/opinion':
            return Pillar.Opinion;
        case 'pillar/sport':
            return Pillar.Sport;
        case 'pillar/arts':
            return Pillar.Culture;
        case 'pillar/lifestyle':
            return Pillar.Lifestyle;
        case 'pillar/news':
        default:
            return Pillar.News;
    }
}


// ----- Exports ----- //

export {
    PillarStyles,
    getPillarStyles,
    pillarFromString,
};
