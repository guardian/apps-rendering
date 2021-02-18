import { css } from '@emotion/core';
import { border, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import Byline from 'components/editions/byline';
import HeaderMedia from 'components/editions/headerMedia';
import Headline from 'components/editions/headline';
import Standfirst from 'components/editions/standfirst';
import type { FC } from 'react';
import { interview, article as item } from '../../../fixtures/item';
import Lines from '../lines';
import { Column } from './Column';
import Container from './Container';
import Grid from './Grid';

const video = {
	kind: 0,
	value: {
		kind: 1,
		video: {
			posterUrl:
				'https://media.guim.co.uk/032aa99755664104fbfc4cbe45cfae0243dce462/0_0_3972_2234/master/3972.jpg',
			videoId: 'wD_bWOEuuoc',
			duration: 59,
			atomId: '26401ff7-24d0-4ba5-8882-2c32c2b379f0',
			title:
				'Super Bowl LV: Tom Brady MVP as Buccaneers beat Chiefs 31-9 – video report',
		},
	},
};

const borderStyles = css`
	${from.tablet} {
		border-right: 1px solid ${border.secondary};
		padding-right: ${remSpace[3]};
	}
`;

const lineStyles = css`
	${from.tablet} {
		margin-right: -${remSpace[3]};
	}
`;

const Article: FC = () => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<HeaderMedia item={{ ...item }} />
			<Column smSpan={12} mdSpan={8} lgSpan={8} className={borderStyles}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines className={lineStyles} />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

const FullWidth: FC = () => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<HeaderMedia item={{ ...interview }} />
			<Column smSpan={12} mdSpan={8} lgSpan={8} className={borderStyles}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines className={lineStyles} />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

const ArticleWithVideo: FC = () => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<HeaderMedia item={{ ...item, mainMedia: video }} />
			<Column smSpan={12} mdSpan={8} lgSpan={8} className={borderStyles}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines className={lineStyles} />
				<Byline item={item} />
			</Column>
		</Grid>
	</Container>
);

// ----- Exports ----- //

export default {
	component: Column,
	title: 'Editions/Grid',
};

export { Article, ArticleWithVideo, FullWidth };
