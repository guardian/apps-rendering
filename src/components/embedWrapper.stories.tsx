// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { some } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { EmbedKind } from '../embed';
import { EmbedComponentWrapper } from './embedWrapper';

// ----- Stories ----- //
const Generic: FC = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Generic,
				alt: some('Lemmy'),
				html:
					'<iframe src="https://embed.spotify.com/?uri=spotify:user:guardianmusic:playlist:00lXay2hDczhstNhC7D1sl" width="460" height="480" frameborder="0" allowtransparency="true">',
				height: 480,
				mandatory: true,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.TRACKS,
			}}
		/>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Generic,
				alt: some('Lemmy'),
				html:
					'<iframe src="https://embed.spotify.com/?uri=spotify:user:guardianmusic:playlist:00lXay2hDczhstNhC7D1sl" width="460" height="480" frameborder="0" allowtransparency="true">',
				height: 480,
				mandatory: true,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
		/>
	</div>
);

const Youtube: FC = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.YouTube,
				id: 'iAIXqcHQTD0',
				width: 460,
				height: 259,
				source: some('YouTube'),
				sourceDomain: some('youtube.com'),
				tracking: EmbedTracksType.TRACKS,
			}}
		/>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.YouTube,
				id: 'iAIXqcHQTD0',
				width: 460,
				height: 259,
				source: some('YouTube'),
				sourceDomain: some('youtube.com'),
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
		/>
	</div>
);

const Spotify: FC = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Spotify,
				src:
					'https://embed.spotify.com/?uri=spotify:album:1PULmKbHeOqlkIwcDMNwD4',
				width: 300,
				height: 380,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.TRACKS,
			}}
		/>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Generic&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Spotify,
				src:
					'https://embed.spotify.com/?uri=spotify:user:juderogers:playlist:5FTUcQhfk54BZwcdiwE1QY',
				width: 300,
				height: 380,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: EmbedComponentWrapper,
	title: 'EmbedComponentWrapper',
	decorators: [withKnobs],
};

export { Generic, Youtube, Spotify };
