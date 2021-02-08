// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { border, neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderMedia from 'components/editions/headerMedia';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import { isPicture } from 'item';
import { useItem } from 'itemContext';
import type { FC } from 'react';
import {
	articleMarginStyles,
	headerBackgroundColour,
	interviewBackgroundColour,
	sidePadding,
	tabletArticleMargin,
	tabletContentWidth,
	tabletImmersiveWidth,
	wideArticleMargin,
	wideContentWidth,
	wideImmersiveWidth,
} from './styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Component ----- //

const headerStyles = css`
	${sidePadding}
`;

const galleryInnerHeaderStyles = css`
	${sidePadding}
	${from.tablet} {
		padding-left: ${tabletArticleMargin}px;
	}

	${from.wide} {
		padding-left: ${wideArticleMargin}px;
	}
`;

const galleryHeaderStyles = css`
	border-bottom: 1px solid ${neutral[100]};
	${from.tablet} {
		border: none;
	}
`;

const pictureHeaderStyles = css`
	border: none;
`;

const galleryLinesStyles = css`
	${from.tablet} {
		margin-left: 0;
	}

	${from.wide} {
		margin-left: 0;
	}
`;

const galleryHeaderBorderStyles = css`
	${from.tablet} {
		border-bottom: 1px solid ${neutral[100]};
		border-right: 1px solid ${neutral[100]};
		box-sizing: border-box;
		width: ${tablet}px;
		${from.wide} {
			width: ${wide}px;
		}
	}
`;

const interviewStyles = (item: Item): SerializedStyles => {
	const backgroundColour = interviewBackgroundColour(item);

	return css`
		${from.tablet} {
			padding-left: ${tabletArticleMargin}px;
		}

		${from.wide} {
			padding-left: ${wideArticleMargin}px;
		}

		background-color: ${backgroundColour};
	`;
};

const immersiveHeadlineStyles = (item: Item): SerializedStyles => {
	const backgroundColour = headerBackgroundColour(item);

	return css`
		position: relative;
		margin-top: -3.3125rem;
		margin-right: 3.625rem;
		z-index: 2;

		${from.tablet} {
			margin-top: -4.625rem;
			padding-left: ${tabletArticleMargin}px;
			width: ${tabletImmersiveWidth}px;
		}

		${from.wide} {
			padding-left: ${wideArticleMargin}px;
			width: ${wideImmersiveWidth}px;
		}

		background-color: ${backgroundColour};
	`;
};

const immersiveStandfirstStyles = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.tablet} {
		padding-left: ${tabletArticleMargin}px;
	}

	${from.wide} {
		padding-left: ${wideArticleMargin}px;
	}
`;

const linesBorderStyles = css`
	${articleMarginStyles}
	border-right: 1px solid ${border.secondary};
`;

const StandardHeader: FC = () => (
	<header css={headerStyles}>
		<HeaderMedia />
		<Series />
		<Headline />
		<Standfirst />
		<Lines />
		<Byline shareIcon />
	</header>
);

const ShowcaseHeader: FC = () => (
	<header css={headerStyles}>
		<Series />
		<Headline />
		<HeaderMedia />
		<Standfirst />
		<Lines />
		<Byline shareIcon />
	</header>
);

const AnalysisHeader: FC = () => (
	<header css={headerStyles}>
		<HeaderMedia />
		<Headline />
		<Byline large />
		<Lines />
		<Standfirst shareIcon />
	</header>
);

const CommentHeader: FC = () => (
	<header css={headerStyles}>
		<HeaderMedia />
		<Headline />
		<Byline large avatar />
		<Lines />
		<Standfirst shareIcon />
	</header>
);

const InterviewHeader: FC = () => {
	const item = useItem();
	return (
		<header>
			<HeaderMedia />
			<div css={interviewStyles(item)}>
				<Headline />
				<Standfirst />
			</div>
			<Lines className={linesBorderStyles} />
			<Byline shareIcon />
		</header>
	);
};

const GalleryHeader: FC = () => (
	<header css={galleryHeaderStyles}>
		<HeaderMedia />
		<div css={galleryInnerHeaderStyles}>
			<Headline />
			<div css={galleryHeaderBorderStyles}>
				<Standfirst />
				<Lines className={galleryLinesStyles} />
				<Byline shareIcon />
			</div>
		</div>
	</header>
);

const PictureHeader: FC = () => (
	<header css={pictureHeaderStyles}>
		<div css={galleryInnerHeaderStyles}>
			<div css={galleryHeaderBorderStyles}>
				<Headline />
				<Standfirst />
				<Lines className={galleryLinesStyles} />
				<Byline shareIcon />
			</div>
		</div>
		<HeaderMedia />
	</header>
);

const ImmersiveHeader: FC = () => {
	const item = useItem();
	return (
		<header>
			<HeaderMedia />
			<div css={immersiveHeadlineStyles(item)}>
				<Headline />
			</div>
			<div css={immersiveStandfirstStyles}>
				<Standfirst />
				<Lines />
			</div>
			<Byline shareIcon />
		</header>
	);
};

const Container: FC = () => {
	const { display, design, tags } = useItem();
	// Display.Immersive needs to come before Design.Interview
	if (display === Display.Immersive) {
		return <ImmersiveHeader />;
	} else if (design === Design.Interview) {
		return <InterviewHeader />;
	} else if (display === Display.Showcase) {
		return <ShowcaseHeader />;
	} else if (design === Design.Analysis) {
		return <AnalysisHeader />;
	} else if (design === Design.Comment) {
		return <CommentHeader />;
	} else if (design === Design.Media) {
		return isPicture(tags) ? <PictureHeader /> : <GalleryHeader />;
	} else {
		return <StandardHeader />;
	}
};

// ----- Exports ----- //

export default Container;
