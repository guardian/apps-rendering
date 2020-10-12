// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { headline, textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { remSpace, palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Format, Display, Design } from '@guardian/types/Format';

import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { darkModeCss, wideContentWidth, articleWidthStyles } from 'styles';
import { Item } from 'item';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';


// ----- Component ----- //

interface Props {
    item: Item;
}

const immersiveStyles = ({ kicker }: PillarStyles, isLabs: boolean): SerializedStyles => css`
    padding: ${remSpace[1]} ${remSpace[2]};
    background-color: ${isLabs ? palette.labs[300] : kicker};
    position: absolute;
    left: 0;
    transform: translateY(-100%);
    margin-top: calc(80vh - 5rem);
    display: inline-block;

    ${from.desktop} {
        margin-top: calc(80vh - 7rem);
    }

    ${from.wide} {
        margin-left: calc(((100% - ${wideContentWidth}px) / 2) - ${remSpace[2]});
    }
`;

const font = (isLabs: boolean): string =>
    isLabs
        ? textSans.medium({ lineHeight: 'loose', fontWeight: 'bold' })
        : headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })

const linkStyles = ({ kicker, inverted }: PillarStyles, isLabs: boolean): SerializedStyles => css`
    ${font(isLabs)}
    color: ${isLabs ? palette.labs[300] : kicker};
    text-decoration: none;

    ${darkModeCss`
        color: ${inverted};
    `}
`;

const immersiveLinkStyles = (isLabs: boolean): SerializedStyles => css`
    color: ${neutral[100]};
    text-decoration: none;
    white-space: nowrap;
    ${font(isLabs)}
`;

const getLinkStyles = ({ display, pillar, design }: Format): SerializedStyles => {
    const isLabs = design === Design.AdvertisementFeature;

    if (display === Display.Immersive) {
        return immersiveLinkStyles(isLabs);
    }

    return linkStyles(getPillarStyles(pillar), isLabs);
}

const getStyles = ({ display, pillar, design }: Format): SerializedStyles => {
    if (display === Display.Immersive) {
        const isLabs = design === Design.AdvertisementFeature;
        return immersiveStyles(getPillarStyles(pillar), isLabs);
    }

    return articleWidthStyles;
}

const Series: FC<Props> = ({ item }: Props) =>
    pipe2(
        item.series,
        map(series =>
            <nav css={getStyles(item)}>
                <a css={getLinkStyles(item)} href={series.webUrl}>
                    {series.webTitle}
                </a>
            </nav>
        ),
        withDefault<ReactElement | null>(null),
    );


// ----- Exports ----- //

export default Series;
