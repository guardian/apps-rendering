// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design, Display, some } from '@guardian/types';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import type { Image } from 'image';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Subcomponents ----- //

interface CaptionProps {
	format: Format;
	image: Image;
}

const Caption: FC<CaptionProps> = ({ format, image }: CaptionProps) => {
	switch (format.display) {
		case Display.Immersive:
			return null;
		default:
			return (
				<HeaderImageCaption
					caption={image.nativeCaption}
					credit={image.credit}
				/>
			);
	}
};

// ----- Component ----- //

const styles = css`
	margin: 0 0 ${remSpace[2]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const liveStyles = css`
	${from.wide} {
		margin-left: 0;
		margin-right: 0;
	}
`;

const immersiveStyles = css`
	margin: 0;
	position: absolute;
	left: 0;
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	display: block;
	width: 100%;
	height: calc(100vw * ${height / width});

	${from.wide} {
		width: ${wideContentWidth}px;
		height: ${(wideContentWidth * height) / width}px;
	}
`;

const immersiveImgStyles = css`
	display: block;
	height: 80vh;
	object-fit: cover;
	width: 100vw;
`;

const getStyles = ({ design, display }: Format): SerializedStyles => {
	switch (design) {
		case Design.LiveBlog:
			return css(styles, liveStyles);
		default:
			if (display === Display.Immersive) {
				return immersiveStyles;
			}

			return styles;
	}
};

const getImgStyles = (format: Format, image: Image): SerializedStyles => {
	switch (format.display) {
		case Display.Immersive:
			return immersiveImgStyles;
		default:
			return imgStyles(image.width, image.height);
	}
};

const getSizes = ({ display }: Format, image: Image): Sizes => {
	switch (display) {
		case Display.Immersive:
			return {
				mediaQueries: [],
				default: `${(100 * image.width) / image.height}vh `,
			};
		default:
			return {
				mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
				default: '100vw',
			};
	}
};

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: Format;
}

const HeaderImage: FC<Props> = ({ className, image, format }: Props) => (
	<figure css={[getStyles(format), className]} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={getSizes(format, image)}
			className={some(getImgStyles(format, image))}
			format={format}
			supportsDarkMode
			lightbox={some({
				className: 'js-launch-slideshow',
				caption: image.nativeCaption,
				credit: image.credit,
			})}
		/>
		<Caption format={format} image={image} />
	</figure>
);

// ----- Exports ----- //

export default HeaderImage;
