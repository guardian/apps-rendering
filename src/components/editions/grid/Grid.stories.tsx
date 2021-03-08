import { Lines } from '@guardian/src-ed-lines';
import Byline from 'components/editions/byline';
import HeaderMedia from 'components/editions/headerMedia';
import Headline from 'components/editions/headline';
import Standfirst from 'components/editions/standfirst';
import type { FC } from 'react';
import { comment as item } from '../../../fixtures/item';
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

const Article: FC = () => (
	<Container>
		<Grid smCols={12} mdCols={12} lgCols={12}>
			<Column smSpan={12} mdSpan={9} lgSpan={9}>
				<HeaderMedia item={{ ...item, mainMedia: video }} />
			</Column>
			<Column smSpan={12} mdSpan={6} lgSpan={6}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines />
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

export { Article };
