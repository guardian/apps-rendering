// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { border, remSpace } from '@guardian/src-foundations';
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
import type { FC, ReactElement } from 'react';
import { Column } from '../grid/Column';
import Container from '../grid/Container';
import Grid from '../grid/Grid';
import {
	headerBackgroundColour,
	interviewBackgroundColour,
	tabletArticleMargin,
	tabletImmersiveWidth,
	wideArticleMargin,
	wideImmersiveWidth,
} from '../styles';

// const wide = wideContentWidth + 12;
// const tablet = tabletContentWidth + 12;

// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

// const galleryHeaderStyles = css`
// 	border-bottom: 1px solid ${neutral[100]};
// 	${from.tablet} {
// 		border: none;
// 	}
// `;

// const pictureHeaderStyles = css`
// 	border: none;
// `;

// const galleryLinesStyles = css`
// 	${from.tablet} {
// 		margin-left: 0;
// 	}

// 	${from.desktop} {
// 		margin-left: 0;
// 	}
// `;

// const galleryHeaderBorderStyles = css`
// 	${from.tablet} {
// 		border-bottom: 1px solid ${neutral[100]};
// 		border-right: 1px solid ${neutral[100]};

// 	}
// `;

const interviewBackgroundStyles = (item: Item): SerializedStyles => {
	const backgroundColour = interviewBackgroundColour(item);

	return css`
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: red;
		width: 100vw;
		margin-left: -16px;
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

		${from.desktop} {
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

	${from.desktop} {
		padding-left: ${wideArticleMargin}px;
	}
`;

const borderStyles = css`
	${from.tablet} {
		border-right: 1px solid ${border.secondary};
		padding-right: 16px;
	}
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6} className={borderStyles}>
				<Series item={item} />
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

const ShowcaseHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={8} lgSpan={6} className={borderStyles}>
				<Series item={item} />
				<Headline item={item} />
			</Column>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6} className={borderStyles}>
				<Standfirst item={item} />
				<Lines />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

const AnalysisHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6} className={borderStyles}>
				<Headline item={item} />
				<Byline item={item} />
				<Lines />
				<Standfirst item={item} shareIcon />
			</Column>
		</Grid>
	</Container>
);

const CommentHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6} className={borderStyles}>
				<Headline item={item} />
				<Byline item={item} />
				<Lines />
				<Standfirst item={item} shareIcon />
			</Column>
		</Grid>
	</Container>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
		</Grid>
		<Container>
			<Grid smCols={12} mdCols={12} lgCols={12}>
				<Column
					smSpan={12}
					mdSpan={8}
					lgSpan={6}
					className={borderStyles}
				>
					<Headline item={item} />
					<Standfirst item={item} />
					<div css={interviewBackgroundStyles(item)}></div>
				</Column>
				<Column
					smSpan={12}
					mdSpan={8}
					lgSpan={6}
					className={borderStyles}
				>
					<Lines />
					<Byline item={item} />
				</Column>
			</Grid>
		</Container>
	</>
);

const GalleryHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6}>
				<Headline item={item} />
			</Column>
			<Column smSpan={12} mdSpan={8} lgSpan={6}>
				<Standfirst item={item} />
				<Lines />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

const PictureHeader: FC<HeaderProps> = ({ item }) => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={8} lgSpan={6}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines />
				<Byline item={item} />
			</Column>
			<Column smSpan={12} mdSpan={12} lgSpan={12}>
				<HeaderMedia item={item} />
			</Column>
		</Grid>
	</Container>
);

const ImmersiveHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderMedia item={item} />
		<div css={immersiveHeadlineStyles(item)}>
			<Headline item={item} />
		</div>
		<div css={immersiveStandfirstStyles}>
			<Standfirst item={item} />
			<Lines />
		</div>
		<Byline item={item} />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	// Display.Immersive needs to come before Design.Interview
	if (item.display === Display.Immersive) {
		return <ImmersiveHeader item={item} />;
	} else if (item.design === Design.GuardianView) {
		return <StandardHeader item={item} />;
	} else if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.design === Design.Comment) {
		return <CommentHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Analysis) {
		return <AnalysisHeader item={item} />;
	} else if (item.design === Design.Media) {
		return isPicture(item.tags) ? (
			<PictureHeader item={item} />
		) : (
			<GalleryHeader item={item} />
		);
	} else {
		return <StandardHeader item={item} />;
	}
};

const Header: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Header;
