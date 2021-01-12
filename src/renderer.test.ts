import {
	renderAll,
	renderEditionsAll,
	renderAllWithoutStyles,
	renderStandfirstText,
	renderText,
	transformHref,
} from 'renderer';
import { JSDOM } from 'jsdom';
import { Pillar } from '@guardian/types';
import { isValidElement, ReactNode } from 'react';
import { compose } from 'lib';
import { BodyElement, ElementKind } from 'bodyElement';
import { Role, none, some } from '@guardian/types';
import { Design, Display, Format } from '@guardian/types';
import { renderToStaticMarkup } from 'react-dom/server';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render as renderDom } from 'react-dom';

const mockFormat: Format = {
	theme: Pillar.News,
	design: Design.Article,
	display: Display.Standard,
};

beforeEach(() => {
	console.error = jest.fn();
});

const textElement = (nodes: string[]): BodyElement => ({
	kind: ElementKind.Text,
	doc: JSDOM.fragment(nodes.join('')),
});

const imageElement = (): BodyElement => ({
	kind: ElementKind.Image,
	src: 'https://theguardian.com/image.jpg',
	srcset: '',
	dpr2Srcset: '',
	alt: some('alt tag'),
	caption: some(JSDOM.fragment('this caption contains <em>html</em>')),
	nativeCaption: some('caption'),
	credit: some('credit'),
	width: 500,
	height: 500,
	role: Role.Standard,
});

const imageElementWithRole = () => ({
	...imageElement(),
});

const pullquoteElement = (): BodyElement => ({
	kind: ElementKind.Pullquote,
	quote: 'quote',
	attribution: none,
});

const pullquoteWithAttributionElement = (): BodyElement => ({
	kind: ElementKind.Pullquote,
	quote: 'quote',
	attribution: some('attribution'),
});

const richLinkElement = (): BodyElement => ({
	kind: ElementKind.RichLink,
	url: 'https://theguardian.com',
	linkText: 'this links to a related article',
});

const interactiveElement = (): BodyElement => ({
	kind: ElementKind.Interactive,
	url: 'https://theguardian.com',
});

const tweetElement = (): BodyElement => ({
	kind: ElementKind.Tweet,
	content: JSDOM.fragment('<span>Tweet contents<span>').querySelectorAll(
		'span',
	),
});

const instagramElement = (): BodyElement => ({
	kind: ElementKind.Instagram,
	html: '<blockquote>Instagram</blockquote>',
});

const embedElement = (): BodyElement => ({
	kind: ElementKind.Embed,
	html: '<section>Embed</section>',
	alt: none,
});

const videoElement = (): BodyElement => ({
	kind: ElementKind.Video,
	src: 'https://www.youtube.com/',
	height: '300',
	width: '500',
});

const audioElement = (): BodyElement => ({
	kind: ElementKind.Audio,
	src: 'https://www.spotify.com/',
	height: '300',
	width: '500',
});

const liveEventElement = (): BodyElement => ({
	kind: ElementKind.LiveEvent,
	linkText: 'this links to a live event',
	url: 'https://theguardian.com',
});

const atomElement = (): BodyElement => ({
	kind: ElementKind.InteractiveAtom,
	css: 'main { background: yellow; }',
	html: '<main>Some content</main>',
	js: some("console.log('init')"),
});

const explainerElement = (): BodyElement => ({
	kind: ElementKind.ExplainerAtom,
	html: '<main>Explainer content</main>',
	title: 'this is an explainer atom',
	id: '',
});

const guideElement = (): BodyElement => ({
	kind: ElementKind.GuideAtom,
	html: '<main>Guide content</main>',
	title: 'this is a guide atom',
	id: '',
});

const qandaElement = (): BodyElement => ({
	kind: ElementKind.QandaAtom,
	html: '<main>QandA content</main>',
	title: 'this is a qanda atom',
	id: '',
});

const profileElement = (): BodyElement => ({
	kind: ElementKind.ProfileAtom,
	html: '<main>Profile content</main>',
	title: 'this is a profile atom',
	id: '',
});

const timelineElement = (): BodyElement => ({
	kind: ElementKind.TimelineAtom,
	title: 'this is a timeline atom',
	id: '',
	events: [
		{
			title: ' ',
			date: '1 May 2019',
			body:
				'<p><a href="https://www.theguardian.com/media/2019/may/01/julian-assange-jailed-for-50-weeks-for-breaching-bail-in-2012">He is jailed for 50 weeks</a>&nbsp;in the UK for breaching his bail conditions back in 2012. An apology letter from Assange is read out in court, but the judge rules that he had engaged in a \'deliberate attempt to evade justice\'. On the following day <a href="https://www.theguardian.com/media/2019/may/02/us-begins-extradition-case-against-julian-assange-in-london">the US extradition proceedings were formally started</a>.&nbsp;</p>',
		},
		{
			title: ' ',
			date: '13 May 2019',
			body:
				'<p>Swedish prosecutors announce they are <a href="https://www.theguardian.com/media/2019/may/13/sweden-reopens-case-against-julian-assange">reopening an investigation into a rape allegation</a> against Julian Assange.</p><p><br></p>',
		},
	],
});

const chartElement = (): BodyElement => ({
	kind: ElementKind.ChartAtom,
	html: '<main>Chart content</main>',
	title: 'this is a chart atom',
	id: '',
	css: [],
	js: [],
});

const quizAtom = (): BodyElement => ({
	kind: ElementKind.QuizAtom,
	id: '',
	questions: [],
});

const audioAtom = (): BodyElement => ({
	kind: ElementKind.AudioAtom,
	title: 'title',
	id: '',
	trackUrl: 'trackUrl',
	kicker: 'kicker',
});

const render = (element: BodyElement): ReactNode[] =>
	renderAll(mockFormat, [element]);

const renderEditions = (element: BodyElement): ReactNode[] =>
	renderEditionsAll(mockFormat, [element]);

const renderWithoutStyles = (element: BodyElement): ReactNode[] =>
	renderAllWithoutStyles(mockFormat, [element]);

const renderCaption = (element: BodyElement): ReactNode[] =>
	renderAll(mockFormat, [element]);

const renderTextElement = compose(render, textElement);

const renderTextElementWithoutStyles = compose(
	renderWithoutStyles,
	textElement,
);

const renderCaptionElement = compose(renderCaption, imageElement);

const getHtml = (node: ReactNode): string =>
	isValidElement(node) ? renderToStaticMarkup(node) : '';

describe('renderer returns expected content', () => {
	test('Renders supported node types for text elements', () => {
		const elements = [
			'<h2></h2>',
			'<blockquote></blockquote>',
			'<strong></strong>',
			'<em></em>',
			'<br>',
			'<ul><li></li></ul>',
			'<mark></mark>',
			'<p></p>',
			'<span></span>',
			'<a></a>',
			'text',
		];

		expect(renderTextElement(elements).flat().length).toBe(11);
		expect(renderTextElementWithoutStyles(elements).flat().length).toBe(11);
	});

	test('Renders caption node types', () => {
		const text = renderCaptionElement(
			JSDOM.fragment('this caption contains'),
		);
		expect(getHtml(text.flat()[0])).toContain('<p');
	});

	test('Removes unsupported caption node types', () => {
		const text = renderCaptionElement(
			JSDOM.fragment(
				'this caption contains <blockquote>html</blockquote>',
			),
		);
		text.flatMap((element) => expect(element).not.toContain('blockquote'));
	});
});

describe('Transforms text nodes', () => {
	test('Transforms bullet points', () => {
		const nodes = renderTextElement([
			'• This is a bullet point we receive from capi',
		]);
		const bullet = nodes.flat()[0];
		expect(getHtml(bullet)).not.toContain(
			'• This is a bullet point we receive from capi',
		);
	});

	test('Transforms horizontal rules', () => {
		const nodes = renderTextElement(['* * *']);
		const horizontalRule = nodes.flat()[0];
		expect(getHtml(horizontalRule)).not.toContain('* * *');
	});
});

describe('Renders different types of elements', () => {
	test('ElementKind.Image', () => {
		const nodes = render(imageElement());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
		expect(getHtml(bodyImage)).toContain('figcaption');
		expect(getHtml(bodyImage)).toContain('caption="caption"');
		expect(getHtml(bodyImage)).toContain('credit="credit"');
	});

	test('ElementKind.Image with thumbnail role', () => {
		const nodes = render(imageElementWithRole());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
	});

	test('ElementKind.Pullquote', () => {
		const nodes = render(pullquoteElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('quote');
		expect(getHtml(pullquote)).not.toContain('attribution');
	});

	test('ElementKind.Pullquote with attribution', () => {
		const nodes = render(pullquoteWithAttributionElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('attribution');
		expect(getHtml(pullquote)).toContain('quote');
	});

	test('ElementKind.RichLink', () => {
		const nodes = render(richLinkElement());
		const richLink = nodes.flat()[0];
		expect(getHtml(richLink)).toContain(
			'<h1>this links to a related article</h1>',
		);
		expect(getHtml(richLink)).toContain('href="https://theguardian.com"');
	});

	test('ElementKind.Interactive', () => {
		const nodes = render(interactiveElement());
		const interactive = nodes.flat()[0];
		expect(getHtml(interactive)).toContain(
			'<iframe src="https://theguardian.com" height="500" title=""></iframe>',
		);
	});

	test('ElementKind.Tweet', () => {
		const nodes = render(tweetElement());
		const tweet = nodes.flat()[0];
		expect(getHtml(tweet)).toContain('twitter-tweet');
	});

	test('ElementKind.Instagram', () => {
		const nodes = render(instagramElement());
		const instagram = nodes.flat()[0];
		expect(getHtml(instagram)).toBe(
			'<div><blockquote>Instagram</blockquote></div>',
		);
	});

	test('ElementKind.Embed', () => {
		const nodes = render(embedElement());
		const embed = nodes.flat()[0];
		expect(getHtml(embed)).toContain('<div><section>Embed</section></div>');
	});

	test('ElementKind.Audio', () => {
		const nodes = render(audioElement());
		const audio = nodes.flat()[0];
		expect(getHtml(audio)).toContain(
			'src="https://www.spotify.com/" sandbox="allow-scripts" height="300" width="500" title="Audio element"',
		);
	});

	test('ElementKind.Video', () => {
		const nodes = render(videoElement());
		const video = nodes.flat()[0];
		expect(getHtml(video)).toContain(
			'src="https://www.youtube.com/" height="300" width="500" allowfullscreen="" title="Video element"',
		);
	});

	test('ElementKind.LiveEvent', () => {
		const nodes = render(liveEventElement());
		const liveEvent = nodes.flat()[0];
		expect(getHtml(liveEvent)).toContain(
			'<h1>this links to a live event</h1>',
		);
	});

	test('ElementKind.InteractiveAtom', () => {
		const nodes = render(atomElement());
		const atom = nodes.flat()[0];
		expect(getHtml(atom)).toContain('main { background: yellow; }');
		expect(getHtml(atom)).toContain('console.log(&#x27;init&#x27;)');
		expect(getHtml(atom)).toContain('Some content');
	});

	test('ElementKind.ExplainerAtom', () => {
		const nodes = render(explainerElement());
		const explainer = nodes.flat()[0];
		expect(getHtml(explainer)).toContain('<main>Explainer content</main>');
	});

	test('ElementKind.GuideAtom', () => {
		const nodes = render(guideElement());
		const guide = nodes.flat()[0];
		expect(getHtml(guide)).toContain('<main>Guide content</main>');
		testHandlers(guide);
	});

	test('ElementKind.QandaAtom', () => {
		const nodes = render(qandaElement());
		const qanda = nodes.flat()[0];
		expect(getHtml(qanda)).toContain('<main>QandA content</main>');
		testHandlers(qanda);
	});

	test('ElementKind.ProfileAtom', () => {
		const nodes = render(profileElement());
		const profile = nodes.flat()[0];
		expect(getHtml(profile)).toContain('<main>Profile content</main>');
		testHandlers(profile);
	});

	test('ElementKind.TimelineAtom', () => {
		const nodes = render(timelineElement());
		const timeline = nodes.flat()[0];
		expect(getHtml(timeline)).toContain(
			'<p>Swedish prosecutors announce they are <a href="https://www.theguardian.com/media/2019/may/13/sweden-reopens-case-against-julian-assange">reopening an investigation into a rape allegation</a> against Julian Assange.</p><p><br></p>',
		);
		testHandlers(timeline);
	});

	test('ElementKind.ChartAtom', () => {
		const nodes = render(chartElement());
		const chart = nodes.flat()[0];
		expect(getHtml(chart)).toContain(
			'srcDoc="&lt;main&gt;Chart content&lt;/main&gt;"',
		);
	});

	test('ElementKind.QuizAtom', () => {
		const nodes = render(quizAtom());
		const quiz = nodes.flat()[0];
		const html = getHtml(quiz);
		expect(html).toContain('<div class="js-quiz">');
		expect(html).toContain(
			'<script class="js-quiz-params" type="application/json">',
		);
	});

	test('ElementKind.AudioAtom', () => {
		const nodes = render(audioAtom());
		const audio = nodes.flat()[0];
		const html = getHtml(audio);
		expect(html).toContain(
			'<div kind="20" title="title" id="" trackUrl="trackUrl" kicker="kicker" pillar="0"',
		);
	});

	function testHandlers(node: ReactNode): void {
		if (isValidElement(node)) {
			const container = document.createElement('div');
			document.body.appendChild(container);
			act(() => {
				renderDom(node, container);
			});

			const likeButton = container.querySelector('[data-testid="like"]');
			const dislikeButton = container.querySelector(
				'[data-testid="dislike"]',
			);
			const feedback = container.querySelector(
				'[data-testid="feedback"]',
			);
			expect(feedback?.getAttribute('hidden')).toBe('');

			act(() => {
				dislikeButton!.dispatchEvent(
					new MouseEvent('click', { bubbles: true }),
				);
			});
			act(() => {
				likeButton!.dispatchEvent(
					new MouseEvent('click', { bubbles: true }),
				);
			});

			expect(feedback?.getAttribute('hidden')).toBeNull();
			unmountComponentAtNode(container);
			container.remove();
		}
	}
});

describe('Renders different types of Editions elements', () => {
	test('ElementKind.Image', () => {
		const nodes = renderEditions(imageElement());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
		expect(getHtml(bodyImage)).toContain('figcaption');
		expect(getHtml(bodyImage)).toContain('caption="caption"');
		expect(getHtml(bodyImage)).toContain('credit="credit"');
	});

	test('ElementKind.Image with thumbnail role', () => {
		const nodes = renderEditions(imageElementWithRole());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
	});

	test('ElementKind.Pullquote', () => {
		const nodes = renderEditions(pullquoteElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('quote');
		expect(getHtml(pullquote)).not.toContain('attribution');
	});

	test('ElementKind.Pullquote with attribution', () => {
		const nodes = renderEditions(pullquoteWithAttributionElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('attribution');
		expect(getHtml(pullquote)).toContain('quote');
	});

	test('ElementKind.RichLink', () => {
		const nodes = renderEditions(richLinkElement());
		const richLink = nodes.flat()[0];
		expect(getHtml(richLink)).toContain(
			'<h1>this links to a related article</h1>',
		);
		expect(getHtml(richLink)).toContain('href="https://theguardian.com"');
	});

	test('ElementKind.Interactive', () => {
		const nodes = renderEditions(interactiveElement());
		const interactive = nodes.flat()[0];
		expect(getHtml(interactive)).toContain(
			'<iframe src="https://theguardian.com" height="500" title=""></iframe>',
		);
	});

	test('ElementKind.Tweet', () => {
		const nodes = renderEditions(tweetElement());
		const tweet = nodes.flat()[0];
		expect(getHtml(tweet)).toContain('twitter-tweet');
	});

	test('ElementKind.Instagram', () => {
		const nodes = renderEditions(instagramElement());
		const instagram = nodes.flat()[0];
		expect(getHtml(instagram)).toBe(
			'<div><blockquote>Instagram</blockquote></div>',
		);
	});

	test('ElementKind.Embed', () => {
		const nodes = renderEditions(embedElement());
		const embed = nodes.flat()[0];
		expect(getHtml(embed)).toContain('<div><section>Embed</section></div>');
	});

	test('ElementKind.Audio', () => {
		const nodes = renderEditions(audioElement());
		const audio = nodes.flat()[0];
		expect(getHtml(audio)).toContain(
			'src="https://www.spotify.com/" sandbox="allow-scripts" height="300" width="500" title="Audio element"',
		);
	});

	test('ElementKind.Video', () => {
		const nodes = renderEditions(videoElement());
		const video = nodes.flat()[0];
		expect(getHtml(video)).toContain(
			'src="https://www.youtube.com/" height="300" width="500" allowfullscreen="" title="Video element"',
		);
	});

	test('ElementKind.LiveEvent', () => {
		const nodes = renderEditions(liveEventElement());
		const liveEvent = nodes.flat()[0];
		expect(getHtml(liveEvent)).toContain(
			'<h1>this links to a live event</h1>',
		);
	});

	test('ElementKind.InteractiveAtom', () => {
		const nodes = renderEditions(atomElement());
		const atom = nodes.flat()[0];
		expect(getHtml(atom)).toContain('main { background: yellow; }');
		expect(getHtml(atom)).toContain('console.log(&#x27;init&#x27;)');
		expect(getHtml(atom)).toContain('Some content');
	});

	test('ElementKind.ExplainerAtom', () => {
		const nodes = renderEditions(explainerElement());
		const explainer = nodes.flat()[0];
		expect(getHtml(explainer)).toContain('<main>Explainer content</main>');
	});

	test('ElementKind.GuideAtom', () => {
		const nodes = renderEditions(guideElement());
		const guide = nodes.flat()[0];
		expect(getHtml(guide)).toContain('<main>Guide content</main>');
		testHandlers(guide);
	});

	test('ElementKind.QandaAtom', () => {
		const nodes = renderEditions(qandaElement());
		const qanda = nodes.flat()[0];
		expect(getHtml(qanda)).toContain('<main>QandA content</main>');
		testHandlers(qanda);
	});

	test('ElementKind.ProfileAtom', () => {
		const nodes = renderEditions(profileElement());
		const profile = nodes.flat()[0];
		expect(getHtml(profile)).toContain('<main>Profile content</main>');
		testHandlers(profile);
	});

	test('ElementKind.TimelineAtom', () => {
		const nodes = renderEditions(timelineElement());
		const timeline = nodes.flat()[0];
		expect(getHtml(timeline)).toContain(
			'<p>Swedish prosecutors announce they are <a href="https://www.theguardian.com/media/2019/may/13/sweden-reopens-case-against-julian-assange">reopening an investigation into a rape allegation</a> against Julian Assange.</p><p><br></p>',
		);
		testHandlers(timeline);
	});

	test('ElementKind.ChartAtom', () => {
		const nodes = renderEditions(chartElement());
		const chart = nodes.flat()[0];
		expect(getHtml(chart)).toContain(
			'srcDoc="&lt;main&gt;Chart content&lt;/main&gt;"',
		);
	});

	test('ElementKind.QuizAtom', () => {
		const nodes = renderEditions(quizAtom());
		const quiz = nodes.flat()[0];
		const html = getHtml(quiz);
		expect(html).toContain('<div class="js-quiz">');
		expect(html).toContain(
			'<script class="js-quiz-params" type="application/json">',
		);
	});

	test('ElementKind.AudioAtom', () => {
		const nodes = renderEditions(audioAtom());
		const audio = nodes.flat()[0];
		const html = getHtml(audio);
		expect(html).toContain(
			'<div kind="20" title="title" id="" trackUrl="trackUrl" kicker="kicker" pillar="0"',
		);
	});

	function testHandlers(node: ReactNode): void {
		if (isValidElement(node)) {
			const container = document.createElement('div');
			document.body.appendChild(container);
			act(() => {
				renderDom(node, container);
			});

			const likeButton = container.querySelector('[data-testid="like"]');
			const dislikeButton = container.querySelector(
				'[data-testid="dislike"]',
			);
			const feedback = container.querySelector(
				'[data-testid="feedback"]',
			);
			expect(feedback?.getAttribute('hidden')).toBe('');

			act(() => {
				dislikeButton!.dispatchEvent(
					new MouseEvent('click', { bubbles: true }),
				);
			});
			act(() => {
				likeButton!.dispatchEvent(
					new MouseEvent('click', { bubbles: true }),
				);
			});

			expect(feedback?.getAttribute('hidden')).toBeNull();
			unmountComponentAtNode(container);
			container.remove();
		}
	}
});

describe('Paragraph tags rendered correctly', () => {
	test('Contains no styles in standfirsts', () => {
		const fragment = JSDOM.fragment(
			'<a href="#"><ul><li><strong><p>Standfirst link</p></strong></li></ul></a>',
		);
		const nodes = renderStandfirstText(fragment, mockFormat);
		const html = getHtml(nodes.flat()[0]);
		expect(html).toContain('<strong><p>Standfirst link</p></strong>');
	});

	test('Contains styles in article body', () => {
		const fragment = JSDOM.fragment(
			'<ul><li><strong><p>Standfirst link</p></strong></li></ul>',
		);
		const nodes = renderText(fragment, mockFormat);
		const html = getHtml(nodes.flat()[0]);
		expect(html).not.toContain('<strong><p>Standfirst link</p></strong>');
	});
});

describe('Transforms hrefs', () => {
	test('Transforms profile links', () => {
		const href = 'profile/firstname_lastname';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/profile/firstname_lastname',
		);
	});

	test('Transforms latest links', () => {
		const href =
			'https://www.theguardian.com/world/series/coronavirus-live/latest';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/world/series/coronavirus-live',
		);
	});

	test('Does not transform valid link', () => {
		const href =
			'https://www.theguardian.com/world/series/coronavirus-live';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/world/series/coronavirus-live',
		);
	});
});
