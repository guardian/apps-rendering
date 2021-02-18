// ----- Imports ----- //

import { Display, Pillar } from '@guardian/types';
import { article, review } from 'fixtures/item';
import type { FC, ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Container from '../grid/Container';
import Grid from '../grid/Grid';
import HeaderMedia from './index';

// ----- Setup ------ //

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

const GridWrapper: FC = ({ children }) => (
	<Container>
		<Grid>{children}</Grid>
	</Container>
);

// ----- Stories ----- //

const Image = (): ReactElement => (
	<GridWrapper>
		<HeaderMedia
			item={{
				...article,
				theme: selectPillar(Pillar.News),
			}}
		/>
	</GridWrapper>
);

const FullScreen = (): ReactElement => (
	<GridWrapper>
		<HeaderMedia
			item={{
				...article,
				display: Display.Immersive,
				theme: selectPillar(Pillar.News),
			}}
		/>
	</GridWrapper>
);

const WithStarRating = (): ReactElement => (
	<GridWrapper>
		<HeaderMedia
			item={{
				...review,
				theme: selectPillar(Pillar.Culture),
			}}
		/>
	</GridWrapper>
);

const Video = (): ReactElement => (
	<GridWrapper>
		<HeaderMedia
			item={{
				...article,
				mainMedia: video,
				theme: selectPillar(Pillar.News),
			}}
		/>
	</GridWrapper>
);

// ----- Exports ----- //

export default {
	component: HeaderMedia,
	title: 'Editions/HeaderMedia',
};

export { Image, FullScreen, WithStarRating, Video };
