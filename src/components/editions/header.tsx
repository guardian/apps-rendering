// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { border, neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import {
	articleMarginStyles,
	headerBackgroundColour,
	interviewBackgroundColour,
	sidePadding,
	tabletArticleMargin,
	tabletContentWidth,
	wideArticleMargin,
	wideContentWidth,
} from './styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

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

const interviewAndImmersiveStyles = (item: Item): SerializedStyles => {
	const backgroundColour =
		item.design === Design.Interview
			? interviewBackgroundColour(item)
			: headerBackgroundColour(item);

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

const linesBorderStyles = css`
	${articleMarginStyles}
	border-right: 1px solid ${border.secondary};
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const ShowcaseHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<Series item={item} />
		<Headline item={item} />
		<HeaderImage item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const AnalysisHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Byline item={item} large />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const CommentHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Byline item={item} large avatar />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderImage item={item} />
		<div css={interviewAndImmersiveStyles(item)}>
			<Headline item={item} />
			<Standfirst item={item} />
		</div>
		<Lines className={linesBorderStyles} />
		<Byline item={item} shareIcon />
	</header>
);

const GalleryHeader: FC<HeaderProps> = ({ item }) => (
	<header css={galleryHeaderStyles}>
		<HeaderImage item={item} />
		<div css={galleryInnerHeaderStyles}>
			<Headline item={item} />
			<div css={galleryHeaderBorderStyles}>
				<Standfirst item={item} />
				<Lines className={galleryLinesStyles} />
				<Byline item={item} shareIcon />
			</div>
		</div>
	</header>
);

const ImmersiveHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderImage item={item} />
		<div css={interviewAndImmersiveStyles(item)}>
			<Headline item={item} />
			<Standfirst item={item} />
			<Lines />
		</div>
		<Byline item={item} shareIcon />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.display === Display.Immersive) {
		return <ImmersiveHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Analysis) {
		return <AnalysisHeader item={item} />;
	} else if (item.design === Design.Comment) {
		return <CommentHeader item={item} />;
	} else if (item.design === Design.Media) {
		return <GalleryHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
