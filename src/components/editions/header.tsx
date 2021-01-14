// ----- Imports ----- //

import { css } from '@emotion/core';
import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';
import { culture } from '@guardian/src-foundations/palette';
import { Design } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC } from 'react';
import type { SerializedStyles } from '@emotion/core';

// ----- Subcomponents ----- //

interface HeaderProps {
	item: Item;
	styles: SerializedStyles;
}

const StandardHeader: FC<HeaderProps> = ({ item, styles }: HeaderProps) => {
	return (
		<header css={styles}>
			<HeaderImage item={item} />
			<Series item={item} />
			<Headline item={item} />
			<Standfirst item={item} />
			<Lines />
			<Byline item={item} />
		</header>
	);
};

// ----- Component ----- //

interface Props {
	item: Item;
}

const headerStyles = css`
	margin: 0 ${remSpace[3]} ${remSpace[4]};
`;

const reviewHeaderStyles = css`
	padding: 0 ${remSpace[3]} ${remSpace[4]};
	background-color: ${culture[800]}
	color: ${culture[300]};
`;

const Header: FC<Props> = ({ item }: Props) => {
	switch (item.design || item.display) {
		case Design.Review:
			return <StandardHeader item={item} styles={reviewHeaderStyles} />;
		default:
			return <StandardHeader item={item} styles={headerStyles} />;
	}
};

// ----- Exports ----- //

export default Header;
