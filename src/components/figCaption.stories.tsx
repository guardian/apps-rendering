// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Format, Pillar, Design, Display } from '@guardian/types/Format';
import { background } from '@guardian/src-foundations/palette';

import FigCaption from './figCaption';
import { Option, None, Some } from 'types/option';


// ----- Setup ----- //

const format: Format = {
    pillar: Pillar.News,
    design: Design.Article,
    display: Display.Standard,
};

const credit = (): Option<string> => {
    if (boolean('Show Credit', false)) {
        return new Some(text('Credit', 'Photograph: A photographer'));
    }

    return new None();
}

const caption = 'A generic caption for an image on the page';


// ----- Stories ----- //

const Default: FC = () =>
    <FigCaption
        format={format}
        text={text('Copy', caption)}
        credit={credit()}
    />

const Media: FC = () =>
    <div css={css`background-color: ${background.inverse};`}>
        <FigCaption
            format={{ ...format, design: Design.Media }}
            text={text('Copy', caption)}
            credit={credit()}
        />
    </div>


// ----- Exports ----- //

export default {
    component: FigCaption,
    title: 'FigCaption',
    decorators: [withKnobs],
}

export {
    Default,
    Media,
}
