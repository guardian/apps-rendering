// ----- Imports ----- //
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { breakpoints } from '@guardian/src-foundations';
import { Display, none, Pillar, Role, some } from '@guardian/types';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import type { Contributor } from 'contributor';
import {
	analysis,
	article,
	cartoon,
	comment,
	correction,
	editorial,
	feature,
	interview,
	letter,
	matchReport,
	media,
	review,
} from 'fixtures/item';
import type { Image } from 'image';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Article from '../article';

// ----- Setup ------ //

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src:
		'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: Role.Immersive,
	caption: none,
	nativeCaption: none,
	credit: none,
};

const contributors: Contributor[] = [
	{
		id: 'emmabrockes',
		name: 'Emma Bookes',
		image: some(image),
		apiUrl: '',
	},
];

const hasContributor = (): { contributors: Contributor[] } => {
	return {
		contributors: boolean('Contributors', true) ? contributors : [],
	};
};

const isImmersive = (): { display: Display } => {
	return {
		display: boolean('Immersive', false)
			? Display.Immersive
			: Display.Standard,
	};
};

const hasShareIcon = (): { webUrl: string } => {
	return {
		webUrl: boolean('ShareIcon', true) ? 'www.guardian.com' : '',
	};
};

const getTag = (id: string, webTitle: string): Tag => ({
	id,
	type: 6,
	webTitle,
	webUrl: '',
	apiUrl: '',
	references: [],
	internalName: '',
});

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Article
		item={{
			...article,
			...isImmersive(),
			...hasShareIcon(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Article
		item={{
			...analysis,
			...isImmersive(),
			...hasShareIcon(),

			tags: [getTag('tone/analysis', 'View from the Guardian ')],
			theme: selectPillar(Pillar.Lifestyle),
		}}
	/>
);

const Editorial = (): ReactElement => (
	<Article
		item={{
			...editorial,
			tags: [getTag('tone/editorials', 'View from the Guardian ')],
			...isImmersive(),
			...hasShareIcon(),

			theme: selectPillar(Pillar.Opinion),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Article
		item={{
			...feature,
			...isImmersive(),
			...hasShareIcon(),

			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Review = (): ReactElement => (
	<Article
		item={{
			...review,
			...hasShareIcon(),

			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Article
		item={{
			...article,
			...hasShareIcon(),

			display: Display.Showcase,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Interview = (): ReactElement => (
	<Article
		item={{
			...interview,
			...hasShareIcon(),

			...isImmersive(),
			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Article
		item={{
			...comment,
			...hasShareIcon(),
			...hasContributor(),
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Letter = (): ReactElement => (
	<Article
		item={{
			...letter,
			...hasShareIcon(),
			tags: [getTag('tone/letters', 'Letters ')],
			theme: selectPillar(Pillar.Opinion),
		}}
	/>
);

const Correction = (): ReactElement => (
	<Article
		item={{
			...correction,
			tags: [
				getTag(
					'theguardian/series/correctionsandclarifications',
					'Corrections and Clarifications ',
				),
			],
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const MatchReport = (): ReactElement => (
	<Article
		item={{
			...matchReport,
			...hasShareIcon(),
			tags: [getTag('tone/sport', 'Sport ')],
			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Cartoon = (): ReactElement => (
	<Article
		item={{
			...cartoon,
			...hasShareIcon(),
			tags: [getTag('type/picture', 'cartoon')],
		}}
	/>
);

const Gallery = (): ReactElement => (
	<Article
		item={{
			...media,
			...hasShareIcon(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

Gallery.parameters = {
	backgrounds: {
		default: 'gallery-template-bg',
		values: [{ name: 'gallery-template-bg', value: '#121212' }],
	},
};

// ----- Exports ----- //

export default {
	component: Article,
	title: 'Editions/Article',
	decorators: [withKnobs],
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

export {
	Default,
	Analysis,
	Feature,
	Review,
	Showcase,
	Interview,
	Comment,
	Editorial,
	Gallery,
	Letter,
	Correction,
	MatchReport,
	Cartoon,
};
