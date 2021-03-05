import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { none, some } from '@guardian/types';
import type { Embed, Generic, Spotify, YouTube } from 'embed';
import { EmbedKind } from 'embed';
import { matchers } from 'jest-emotion';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
	createEmbedComponentFromProps,
	EmbedComponentInClickToView,
	EmbedComponentWrapper,
} from './embedWrapper';

expect.extend(matchers);

let container: Element = document.createElement('div');
beforeEach(() => {
	// setup a DOM element as a render target
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = document.createElement('div');
});

describe('EmbedComponentWrapper.embedComponentFromWrapperProps', () => {
	const testCreateContentFromProps = (embed: Embed): void => {
		const embedComponentWrapper = <EmbedComponentWrapper embed={embed} />;

		act(() => {
			render(embedComponentWrapper, container);
		});

		const expectedWrapperContents = (
			<EmbedComponentInClickToView embed={embed} />
		);

		if (container.firstElementChild) {
			const embedComponentFromWrapperProps = createEmbedComponentFromProps(
				container.firstElementChild,
			);
			expect(embedComponentFromWrapperProps).toStrictEqual(
				some(expectedWrapperContents),
			);
		} else {
			fail('EmbedComponentWapper was not rendered');
		}
	};

	it('should recreate contents of wrapper from wrapper data props for generic embed', () => {
		const genericEmbed: Generic = {
			kind: EmbedKind.Generic,
			alt: some('some alt text'),
			html: '<iframe src="http://test.com" />',
			height: 300,
			mandatory: true,
			source: some('An Embed Provider'),
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		testCreateContentFromProps(genericEmbed);
	});

	it('should recreate contents of wrapper from wrapper data props for generic embed without optional parameters', () => {
		const genericEmbed: Generic = {
			kind: EmbedKind.Generic,
			alt: none,
			html: '<iframe src="http://test.com" />',
			height: 300,
			mandatory: true,
			source: none,
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		testCreateContentFromProps(genericEmbed);
	});

	it('should recreate contents of wrapper from wrapper data props for spotify embed', () => {
		const spotifyEmbed: Spotify = {
			kind: EmbedKind.Spotify,
			src: 'https://spotify.com/someembed',
			width: 200,
			height: 300,
			source: some('An Embed Provider'),
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		testCreateContentFromProps(spotifyEmbed);
	});

	it('should recreate contents of wrapper from wrapper data props for Youtube embed', () => {
		const youTubeEmbed: YouTube = {
			kind: EmbedKind.YouTube,
			id: 'videoid',
			height: 300,
			width: 200,
			source: some('An Embed Provider'),
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		testCreateContentFromProps(youTubeEmbed);
	});
});
