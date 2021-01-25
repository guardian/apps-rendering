// ----- Imports ----- //

import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import { sidePadding } from './styles';
// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

const headerStyles = css`
	${sidePadding}
`;
const whiteBackground = css`
	background-color: ${neutral[100]};
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

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines className={whiteBackground} />
		<Byline item={item} shareIcon />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Analysis) {
		return <AnalysisHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
