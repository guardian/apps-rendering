// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { none, some } from '@guardian/types';
import HeaderImageCaption, {
	captionId,
} from 'components/editions/headerImageCaption';
import StarRating from 'components/editions/starRating';
import { MainMediaKind } from 'headerMedia';
import { isPicture, Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { sidePadding } from '../styles';

// ----- Styles ----- //

const styles = css`
	margin: 0;
	position: relative;
	width: 100%;
	height: 100%;
`;

const captionStyles = css`
	width: 100%;
	height: 100%;
`;

const videoWrapperStyles = css`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
`;

const videoStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const imageStyles: SerializedStyles = css`
	display: block;
	width: 100%;
	height: 100%;
`;

const pictureStyles: SerializedStyles = css`
	${sidePadding}
`;

// ----- Component ----- //

interface Props {
	item: Item;
}

const sizes: Sizes = {
	mediaQueries: [],
	default: '100vw',
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
				<figure
					css={[styles, isPicture(item.tags) ? pictureStyles : null]}
					aria-labelledby={captionId}
				>
					<Img
						image={image}
						sizes={sizes}
						format={item}
						className={some(imageStyles)}
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
			);
		} else {
			const {
				video: { title, atomId },
			} = media;
			return (
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
			);
		}
	});
};

// ----- Exports ----- //

export default HeaderMedia;
