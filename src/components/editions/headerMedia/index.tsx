// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { border, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design, Display, none, some } from '@guardian/types';
import HeaderImageCaption, {
	captionId,
} from 'components/editions/headerImageCaption';
import StarRating from 'components/editions/starRating';
import { MainMediaKind } from 'headerMedia';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { Column } from '../grid/Column';

// ----- Styles ----- //

const videoWrapperStyles = css`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
`;

const videoColumnStyles = css`
	${from.tablet} {
		border-right: 1px solid ${border.secondary};
		padding-right: ${remSpace[3]};
	}
`;

const videoStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const styles = css`
	margin: 0;
	position: relative;
	width: 100%;
`;

const fullWidthStyles = css`
	margin: 0;
	position: relative;
	width: 100%;
`;

const captionStyles = css`
	width: 100%;
	height: 100%;
`;

const imageStyle: SerializedStyles = css`
	display: block;
	width: 100%;
	height: 100%;
`;

const isFullWidthImage = (format: Format): boolean =>
	format.display === Display.Immersive ||
	format.design === Design.Interview ||
	format.design === Design.Media;

const getStyles = (format: Format): SerializedStyles => {
	return isFullWidthImage(format) ? fullWidthStyles : styles;
};

// ----- Component ----- //

interface Props {
	item: Item;
}

interface ColProps {
	smSpan: number;
	mdSpan: number;
	lgSpan: number;
}

const sizes: Sizes = {
	mediaQueries: [],
	default: '100vw',
};

const imageColProps = (format: Format): ColProps | void => {
	if (!isFullWidthImage(format)) {
		return {
			smSpan: 12,
			mdSpan: 12,
			lgSpan: 10,
		};
	}
};

const videoColProps = (format: Format): ColProps | void => {
	if (!isFullWidthImage(format)) {
		return {
			smSpan: 12,
			mdSpan: 8,
			lgSpan: 8,
		};
	}
};

const HeaderMedia: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const {
		cameraIcon: iconColor,
		cameraIconBackground: iconBackgroundColor,
	} = getThemeStyles(format.theme);

	return maybeRender(item.mainMedia, (media) => {
		if (media.kind === MainMediaKind.Image) {
			const {
				image,
				image: { nativeCaption, credit },
			} = media;

			return (
				<Column {...imageColProps(format)}>
					<figure
						css={[getStyles(format)]}
						aria-labelledby={captionId}
					>
						<Img
							image={image}
							sizes={sizes}
							format={item}
							className={some(imageStyle)}
							supportsDarkMode
							lightbox={some({
								className: 'js-launch-slideshow js-main-image',
								caption: none,
								credit: none,
							})}
						/>
						<HeaderImageCaption
							caption={nativeCaption}
							credit={credit}
							styles={captionStyles}
							iconColor={iconColor}
							iconBackgroundColor={iconBackgroundColor}
						/>
						<StarRating item={item} />
					</figure>
				</Column>
			);
		} else {
			const {
				video: { title, atomId },
			} = media;
			return (
				<Column
					{...videoColProps(format)}
					className={videoColumnStyles}
				>
					<div css={videoWrapperStyles}>
						<iframe
							title={title}
							css={videoStyles}
							frameBorder="0"
							scrolling="no"
							allowFullScreen
							src={`https://embed.theguardian.com/embed/atom/media/${atomId}#noadsaf`}
						></iframe>
					</div>
				</Column>
			);
		}
	});
};

// ----- Exports ----- //

export default HeaderMedia;
