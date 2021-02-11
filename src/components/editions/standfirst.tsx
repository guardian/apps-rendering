// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import { body, headline } from '@guardian/src-foundations/typography';
import { Design, Display } from '@guardian/types';
import type { ItemExtras } from 'itemExtrasContext';
import { useItemExtras } from 'itemExtrasContext';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { ShareIcon } from './shareIcon';
import { articleWidthStyles, sidePadding } from './styles';

// ----- Component ----- //

const styles = (kickerColor: string): SerializedStyles => css`
	${body.medium({ lineHeight: 'tight' })}
	display: flex;
	justify-content: space-between;
	padding-bottom: ${remSpace[4]};
	color: ${text.primary};

	${articleWidthStyles}

	p,
	ul {
		padding-top: ${remSpace[1]};
		margin: 0;
	}

	address {
		font-style: normal;
	}

	svg {
		flex: 0 0 1.875rem;
		margin-top: 0.375rem;
		padding-left: 0.5rem;
		width: 1.875rem;
		height: 1.875rem;

		circle {
			stroke: ${kickerColor};
		}

		path {
			fill: ${kickerColor};
		}
	}
`;

const interviewStyles = css`
	${sidePadding}
`;
const showcaseStyles = css`
	${headline.xxsmall({ lineHeight: 'tight' })}
	color: ${neutral[20]}
`;

const galleryStyles = css`
	${headline.xxsmall({ lineHeight: 'tight', fontWeight: 'regular' })}
	color: ${neutral[100]};
`;

const greyTextStyles = css`
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })}
	color: ${neutral[46]}
`;

const immersiveStyles = `
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })};
	color: ${neutral[100]};
`;

interface Props {
	shareIcon?: boolean;
}

const noLinks = true;

const getStyles = (itemExtras: ItemExtras): SerializedStyles => {
	const {
		format,
		themeStyles: { kicker: kickerColor },
	} = itemExtras;

	// Display.Immersive needs to come before Design.Interview
	if (format.display === Display.Immersive) {
		return css(styles(kickerColor), immersiveStyles);
	}
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	if (format.design === Design.Analysis || format.design === Design.Comment) {
		return css(styles(kickerColor), greyTextStyles);
	}
	if (format.display === Display.Showcase) {
		return css(styles(kickerColor), showcaseStyles);
	}
	if (format.design === Design.Media) {
		return css(styles(kickerColor), galleryStyles);
	}
	return styles(kickerColor);
};

const Standfirst: FC<Props> = ({ shareIcon }) => {
	const itemExtras = useItemExtras();
	return maybeRender(itemExtras.standfirst, (standfirst) => (
		<div css={getStyles(itemExtras)}>
			{renderStandfirstText(standfirst, itemExtras, noLinks)}
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Standfirst;
