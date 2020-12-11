// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';
import {maybeRender} from "../../lib";
import {Item} from "../../item";
import { MainMediaKind } from 'headerMedia';

// ----- Component ----- //

const videoHeight = wideContentWidth * 0.5625;

const marginAuto = `
    margin-left: auto;
    margin-right: auto;
`;

const backgroundColour = (format: Format): string => {
    switch (format.design) {
        case Design.Media:
            return neutral[20];
        case Design.Comment:
            return neutral[86];
        default:
            return neutral[97];
    }
};

const styles = (format: Format): SerializedStyles => css`
	margin: 0 0 ${remSpace[2]} 0;
	position: relative;
	display: block;
	width: 100%;
	padding-bottom: 56.25%;
	background: ${backgroundColour(format)};

	${darkModeCss`
        background: ${neutral[20]};
    `}

	${from.wide} {
		padding-bottom: ${videoHeight}px;
		width: ${wideContentWidth}px;
		${format.design !== Design.Live ? marginAuto : null}
	}
`;

interface Props {
    item: Item;
}

const HeaderVideo: FC<Props> = ({ item }) =>
    maybeRender(item.mainMedia, (media) => {
        if(media.kind === MainMediaKind.Video) {
            return (
                <div
                    css={styles}
                    data-posterUrl={media.video.posterUrl}
                    data-videoId={media.video.videoId}
                    data-duration={media.video.duration}
                ></div>
            );
        }
        return null;
    });

// ----- Exports ----- //

export default HeaderVideo;
