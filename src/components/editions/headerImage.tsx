// ----- Imports ----- //

import { css } from '@emotion/core';
import { brandAltBackground, remSpace } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import Img from 'components/img';
import { MainMediaKind } from 'headerMedia';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	margin: 0;
	position: relative;
	div {
		background-color: ${brandAltBackground.primary};
		position: absolute;
		bottom: 0;
		left: 0;
		${body.medium({ fontWeight: 'regular' })};
		padding: 0px 5px 3px 5px;
	}
`;

const imgStyles = css`
	display: block;
	width: 100%;
`;

interface Props {
	item: Item;
}

const HeaderImage: FC<Props> = ({ item }) =>
	maybeRender(item.mainMedia, (media) => {
		if (media.kind === MainMediaKind.Image) {
			return (
				<figure css={styles}>
					<Img
						image={media.image}
						sizes={`calc(100vw - (${remSpace[4]} * 2)`}
						format={item}
						className={imgStyles}
					/>
					<div>Man Utd 1 Arsenal 2</div>
				</figure>
			);
		}

		return null;
	});

// ----- Exports ----- //

export default HeaderImage;
