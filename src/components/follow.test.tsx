// ----- Imports ----- //

import { Design, Display, none, Pillar } from '@guardian/types';
import type { Contributor } from 'contributor';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Follow from './follow';

// ----- Setup ----- //

const followFormat = {
	theme: Pillar.News,
	design: Design.Article,
	display: Display.Standard,
};

// ----- Tests ----- //

describe('Follow component renders as expected', () => {
	it('Displays title correctly', () => {
		const contributors: Contributor[] = [
			{
				apiUrl: 'https://mapi.co.uk/test',
				name: 'George Monbiot',
				id: 'test',
				image: none,
			},
		];

		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} {...followFormat} />,
				container,
			);
		});

		expect(container.textContent).toBe('Follow George Monbiot');

		unmountComponentAtNode(container);
		container.remove();
	});

	it('Renders null if no apiUrl', () => {
		const contributors: Contributor[] = [
			{ name: 'George Monbiot', id: 'test', apiUrl: '', image: none },
		];

		const follow = renderer.create(
			<Follow contributors={contributors} {...followFormat} />,
		);

		expect(follow.root.children).toHaveLength(0);
	});

	it('Renders null if more than one contributor', () => {
		const contributors: Contributor[] = [
			{
				name: 'Contributor 1',
				apiUrl: 'https://mapi.co.uk/test',
				id: 'test',
				image: none,
			},
			{
				name: 'Contributor 2',
				apiUrl: 'https://mapi.co.uk/test',
				id: 'test',
				image: none,
			},
		];

		const follow = renderer.create(
			<Follow contributors={contributors} {...followFormat} />,
		);

		expect(follow.root.children).toHaveLength(0);
	});
});
