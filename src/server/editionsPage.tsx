// ----- Imports ----- //

import { CacheProvider } from '@emotion/core';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { OptionKind, none, map, some } from '@guardian/types/option';
import type { Option } from '@guardian/types/option';
import Article from 'components/editions/article';
import type { EmotionCritical } from 'create-emotion-server';
import { cache } from 'emotion';
import { extractCritical } from 'emotion-server';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { assetHashes } from 'server/csp';
import { pageFonts } from 'styles';
import { getThirdPartyEmbeds } from 'capi';
import Scripts from 'components/scripts';
import { ReactElement } from 'react';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);

// ----- Functions ----- //

const csp = (styles: string[]): string =>
	`
	default-src 'self';
	style-src ${assetHashes(styles)};
	img-src 'self' https://i.guim.co.uk;
	`.trim();

const styles = `
    ${pageFonts}

    body {
        margin: 0;
    }
`;

const renderHead = (
	request: RenderingRequest,
	emotionCritical: EmotionCritical,
): string =>
	renderToString(
		<>
			<meta charSet="utf-8" />
			<title>{request.content.webTitle}</title>
			<meta name="viewport" content="initial-scale=1" />
			<meta
				httpEquiv="Content-Security-Policy"
				content={csp([styles, emotionCritical.css])}
			/>
			<style data-emotion-css={emotionCritical.ids.join(' ')}>
				{emotionCritical.css}
			</style>
		</>,
	);

const renderBody = (item: Item): EmotionCritical =>
	compose(
		extractCritical,
		renderToString,
	)(
		<CacheProvider value={cache}>
			<Article item={item} />
		</CacheProvider>,
	);

const buildHtml = (
	head: string,
	body: string,
	scripts: ReactElement,
	inlineScript: Option<string>,
): string => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            ${head}
            <style>${styles}</style>
        </head>
        <body>
			${body}
			${
				inlineScript.kind === OptionKind.Some
					? `<script>${inlineScript.value}</script>`
					: renderToString(scripts)
			}
        </body>
    </html>
`;

async function render(
	imageSalt: string,
	request: RenderingRequest,
	getAssetLocation: (assetName: string) => string,
	editionsInlineScript: Option<string>,
): Promise<Page> {
	const item = fromCapi({ docParser, salt: imageSalt })(request);
	const clientScript = map(getAssetLocation)(some('editions.js'));
	const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);
	const body = renderBody(item);
	const scripts = (
		<Scripts
			clientScript={clientScript}
			twitter={thirdPartyEmbeds.twitter}
		/>
	);
	return {
		html: buildHtml(
			renderHead(request, body),
			body.html,
			scripts,
			editionsInlineScript,
		),
		clientScript: none,
	};
}

// ----- Exports ----- //

export { render };
