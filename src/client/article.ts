// ----- Imports ----- //

import 'regenerator-runtime/runtime.js';
import {
	AudioAtom,
	KnowledgeQuizAtom,
	PersonalityQuizAtom,
} from '@guardian/atoms-rendering';
import type { ICommentResponse as CommentResponse } from '@guardian/bridget';
import { Topic } from '@guardian/bridget/Topic';
import { App } from '@guardian/discussion-rendering/build/App';
import {
	ads,
	reportNativeElementPositionChanges,
	slideshow,
	videos,
} from 'client/nativeCommunication';
import setup from 'client/setup';
import Epic from 'components/shared/epic';
import FooterCcpa from 'components/shared/footer';
import { formatDate, formatLocal, isValidDate } from 'date';
import { handleErrors, isObject } from 'lib';
import {
	acquisitionsClient,
	discussionClient,
	notificationsClient,
	userClient,
} from 'native/nativeApi';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { stringToPillar } from 'themeStyles';
import { logger } from '../logger';

// ----- Run ----- //

const followText = 'Follow ';
const followingText = 'Following ';

interface FontFaceSet {
	readonly ready: Promise<FontFaceSet>;
}

declare global {
	interface Document {
		fonts: FontFaceSet;
	}
}

function getTopic(follow: Element | null): Topic | null {
	const id = follow?.getAttribute('data-id');
	const displayName = follow?.getAttribute('data-display-name');

	if (!id) {
		logger.error('No id for topic');
		return null;
	}

	if (!displayName) {
		logger.error('No display name for topic');
		return null;
	}
	return new Topic({ id, displayName, type: 'tag-contributor' });
}

function topicClick(e: Event): void {
	const follow = document.querySelector('.js-follow');
	const status = follow?.querySelector('.js-status');
	const statusText = status?.textContent;
	const topic = getTopic(follow);

	if (topic) {
		if (statusText && statusText === followText) {
			void notificationsClient.follow(topic).then((success) => {
				if (status?.textContent && success) {
					status.textContent = followingText;
				}
			});
		} else {
			void notificationsClient.unfollow(topic).then((success) => {
				if (status?.textContent && success) {
					status.textContent = followText;
				}
			});
		}
	}
}

function topics(): void {
	const follow = document.querySelector('.js-follow');
	const status = follow?.querySelector('.js-status');
	const topic = getTopic(follow);

	if (topic) {
		follow?.addEventListener('click', topicClick);
		void notificationsClient.isFollowing(topic).then((following) => {
			if (following && status?.textContent) {
				status.textContent = followingText;
			}
		});
	}
}

function formatDates(): void {
	Array.from(document.querySelectorAll('time[data-date]')).forEach((time) => {
		const timestamp = time.getAttribute('data-date');

		try {
			if (timestamp) {
				time.textContent = formatDate(new Date(timestamp));
			}
		} catch (e) {
			const message =
				timestamp ?? 'because the data-date attribute was empty';

			logger.error(`Unable to parse and format date ${message}`, e);
		}
	});
}

// TODO: show epics on opinion articles
function insertEpic(): void {
	const epicPlaceholder = document.getElementById('epic-placeholder');
	if (epicPlaceholder) {
		epicPlaceholder.innerHTML = '';
	}
	if (navigator.onLine && epicPlaceholder) {
		Promise.all([userClient.isPremium(), acquisitionsClient.getEpics()])
			.then(([isPremium, maybeEpic]) => {
				if (!isPremium && maybeEpic.epic) {
					const {
						title,
						body,
						firstButton,
						secondButton,
					} = maybeEpic.epic;
					const epicProps = {
						title,
						body,
						firstButton,
						secondButton,
					};
					ReactDOM.render(h(Epic, epicProps), epicPlaceholder);
				}
			})
			.catch((error) => console.error(error));
	}
}

declare type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';

function isPillarString(pillar: string): boolean {
	return ['news', 'opinion', 'sport', 'culture', 'lifestyle'].includes(
		pillar.toLowerCase(),
	);
}
function renderComments(): void {
	const commentContainer = document.getElementById('comments');
	const pillarString = commentContainer?.getAttribute('data-pillar');
	const shortUrl = commentContainer?.getAttribute('data-short-id');
	const isClosedForComments = !!commentContainer?.getAttribute('pillar');

	if (pillarString && isPillarString(pillarString) && shortUrl) {
		const pillar = pillarString as Pillar;
		const user = {
			userId: 'abc123',
			displayName: 'Jane Smith',
			webUrl: '',
			apiUrl: '',
			secureAvatarUrl: '',
			avatar: '',
			badge: [],
		};

		const additionalHeaders = {};

		const props = {
			shortUrl,
			baseUrl: 'https://discussion.theguardian.com/discussion-api',
			pillar: stringToPillar(pillar),
			user,
			isClosedForComments,
			additionalHeaders,
			expanded: false,
			apiKey: 'ios',
			onPermalinkClick: (commentId: number): void => {
				console.log(commentId);
			},
			onRecommend: (commentId: number): Promise<boolean> => {
				return discussionClient.recommend(commentId);
			},
			onComment: (
				shortUrl: string,
				body: string,
			): Promise<CommentResponse & { status: 'ok' | 'error' }> => {
				return discussionClient
					.comment(shortUrl, body)
					.then((response) => ({ ...response, status: 'ok' }));
			},
			onReply: (
				shortUrl: string,
				body: string,
				parentCommentId: number,
			): Promise<CommentResponse & { status: 'ok' | 'error' }> => {
				return discussionClient
					.reply(shortUrl, body, parentCommentId)
					.then((response) => ({ ...response, status: 'ok' }));
			},
			onPreview: (body: string): Promise<string> => {
				return discussionClient.preview(body);
			},
		};

		ReactDOM.render(h(App, props), commentContainer);
	}
}

function footerInit(): void {
	const isAndroid = /(android)/i.test(navigator.userAgent);
	const footer = document.getElementById('articleFooter');
	if (footer && isAndroid) {
		footer.innerHTML = '';
	} else {
		isCCPA();
	}
}

function isCCPA(): void {
	userClient
		.doesCcpaApply()
		.then((isOptedIn) => {
			const comp = h(FooterCcpa, { isCcpa: isOptedIn });
			ReactDOM.render(comp, document.getElementById('articleFooter'));
		})
		.catch((error) => {
			console.log(error);
		});
}

type FormData = Record<string, string>;

function submit(body: FormData, form: Element): void {
	fetch(
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
	)
		.then(() => {
			const message = document.createElement('p');
			message.textContent = 'Thank you for your contribution';
			if (form.firstChild) {
				form.replaceChild(message, form.firstChild);
			}
		})
		.catch(() => {
			const errorPlaceholder = form.querySelector('.js-error-message');
			if (errorPlaceholder) {
				errorPlaceholder.textContent =
					'Sorry, there was a problem submitting your form. Please try again later.';
			}
		});
}

function readFile(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		setTimeout(reject, 30000);

		reader.addEventListener('load', () => {
			if (reader.result) {
				const fileAsBase64 = reader.result
					.toString()
					.split(';base64,')[1];
				resolve(fileAsBase64);
			}
		});

		reader.addEventListener('error', () => {
			reject();
		});

		reader.readAsDataURL(file);
	});
}

function callouts(): void {
	const callouts = Array.from(document.querySelectorAll('.js-callout'));
	callouts.forEach((callout) => {
		const buttons = Array.from(
			callout.querySelectorAll('.js-callout-expand'),
		);
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				callout.toggleAttribute('open');
			});
		});

		const form = callout.querySelector('form');
		if (!form) return;
		form.addEventListener(
			'submit',
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- use async function
			async (e): Promise<void> => {
				try {
					e.preventDefault();
					const elements = form.getElementsByTagName('input');
					const data = Array.from(elements).reduce(
						async (o: Promise<FormData>, elem) => {
							const acc = await o;
							const { type, checked, name, value, files } = elem;
							if (type === 'radio') {
								if (checked) {
									acc[name] = value;
								}
							} else if (type === 'file' && files?.length) {
								acc[name] = await readFile(files[0]);
							} else if (value) {
								acc[name] = value;
							}
							return Promise.resolve(acc);
						},
						Promise.resolve({}),
					);

					submit(await data, form);
				} catch (e) {
					const errorPlaceholder = form.querySelector(
						'.js-error-message',
					);
					if (errorPlaceholder) {
						errorPlaceholder.textContent =
							'There was a problem with the file you uploaded above. We accept images and pdfs up to 6MB';
					}
				}
			},
		);
	});
}

function hasSeenCards(): void {
	const articleIds = Array.from(document.querySelectorAll('.js-card'))
		.map((card) => card.getAttribute('data-article-id') ?? '')
		.filter((articleId) => articleId !== '');

	void userClient.filterSeenArticles(articleIds).then((seenArticles) => {
		seenArticles.forEach((id) => {
			document
				.querySelector(`.js-card[data-article-id='/${id}']`)
				?.classList.add('fade');
		});
	});
}

function initAudioAtoms(): void {
	Array.from(document.querySelectorAll('.js-audio-atom')).forEach((atom) => {
		const id = atom.getAttribute('id');
		const trackUrl = atom.getAttribute('trackurl');
		const kicker = atom.getAttribute('kicker');
		const title = atom.getAttribute('title');
		const pillar = parseInt(atom.getAttribute('pillar') ?? '0');
		if (id && trackUrl && kicker && title && pillar) {
			ReactDOM.hydrate(
				h(AudioAtom, { id, trackUrl, pillar, kicker, title }),
				atom,
			);
		}
	});
}

function hydrateQuizAtoms(): void {
	Array.from(document.querySelectorAll('.js-quiz')).forEach((atom) => {
		const props = atom.querySelector('.js-quiz-params')?.innerHTML;
		try {
			if (props) {
				const quizProps = (JSON.parse(
					props.replace(/&quot;/g, '"'),
				) as unknown) as { quizType: string };
				if (quizProps.quizType === 'personality') {
					ReactDOM.hydrate(
						h(
							PersonalityQuizAtom,
							(quizProps as unknown) as React.ComponentProps<
								typeof PersonalityQuizAtom
							>,
						),
						atom,
					);
				} else if (quizProps.quizType === 'knowledge') {
					ReactDOM.hydrate(
						h(
							KnowledgeQuizAtom,
							(quizProps as unknown) as React.ComponentProps<
								typeof KnowledgeQuizAtom
							>,
						),
						atom,
					);
				}
			}
		} catch (e) {
			console.error(e);
		}
	});
}

function localDates(): void {
	const date = document.querySelector('time.js-date');
	const dateString = date?.getAttribute('data-date');
	if (!dateString || !date) return;
	try {
		const localDate = new Date(dateString);
		if (isValidDate(localDate)) {
			date.textContent = formatLocal(localDate);
		}
	} catch (e) {
		console.error('Could not set a local date', e);
	}
}

function richLinks(): void {
	document
		.querySelectorAll('.js-rich-link[data-article-id]')
		.forEach((richLink) => {
			const articleId = richLink.getAttribute('data-article-id');
			if (articleId) {
				const options = {
					headers: {
						Accept: 'application/json',
					},
				};
				void fetch(`${articleId}?richlink`, options)
					.then(handleErrors)
					.then((resp) => resp.json())
					.then((response: unknown) => {
						if (isObject(response)) {
							const pillar =
								typeof response.pillar === 'string'
									? response.pillar.toLowerCase()
									: null;
							const image = response.image;

							if (pillar) {
								richLink.classList.add(`js-${pillar}`);
							}

							const placeholder = richLink.querySelector(
								'.js-image',
							);
							if (placeholder && typeof image === 'string') {
								const img = document.createElement('img');
								img.setAttribute('alt', 'Related article');
								img.setAttribute('src', image);
								placeholder.appendChild(img);
							}
						}
					})
					.catch((error) => console.error(error));
			}
		});
}

setup();
ads();
videos();
reportNativeElementPositionChanges();
topics();
slideshow();
formatDates();
insertEpic();
callouts();
renderComments();
hasSeenCards();
initAudioAtoms();
hydrateQuizAtoms();
footerInit();
localDates();
richLinks();
