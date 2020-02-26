// ----- Imports ----- //

import React, { ReactNode, ReactElement } from 'react';
import { css } from '@emotion/core';

import Standard from 'components/standard/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Immersive from 'components/immersive/article';

import { IContent as Content } from 'mapiThriftModels/Content';
import { includesTweets } from 'capi';
import { fontFace, darkModeCss } from 'styles';
import { None, Some } from 'types/option';
import { renderAll } from 'renderer';
import { JSDOM } from 'jsdom';
import { partition } from 'types/result';
import { getAdPlaceholderInserter } from 'ads';
import { fromCapi, Design, Display } from 'item';
import { background, neutral } from '@guardian/src-foundations';


// ----- Components ----- //

const PageStyles = css`
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new None, "/public/fonts/GuardianTextEgyptian-Reg.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new Some("italic"), "/public/fonts/GuardianTextEgyptian-RegItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new None, "/public/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new Some("italic"), "/public/fonts/GuardianTextEgyptian-BoldItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new None, "/public/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new Some("italic"), "/public/fonts/GuardianTextEgyptian-BoldItalic.ttf")}

    ${fontFace("Guardian Text Sans Web", new Some(400), new None, "/public/fonts/GuardianTextSans-Regular.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(400), new Some("italic"), "/public/fonts/GuardianTextSans-RegularItalic.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new None, "/public/fonts/GuardianTextSans-Bold.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new Some("italic"), "/public/fonts/GuardianTextSans-BoldItalic.ttf")}

    ${fontFace("Guardian Headline", new Some(300), new None, "/public/fonts/GHGuardianHeadline-Light.ttf")}
    ${fontFace("Guardian Headline", new Some(300), new Some("italic"), "/public/fonts/GHGuardianHeadline-LightItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(400), new None, "/public/fonts/GHGuardianHeadline-Regular.ttf")}
    ${fontFace("Guardian Headline", new Some(400), new Some("italic"), "/public/fonts/GHGuardianHeadline-RegularItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(500), new None,  "/public/fonts/GHGuardianHeadline-Medium.ttf")}
    ${fontFace("Guardian Headline", new Some(500), new Some("italic"),  "/public/fonts/GHGuardianHeadline-MediumItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(600), new None,  "/public/fonts/GHGuardianHeadline-Semibold.ttf")}
    ${fontFace("Guardian Headline", new Some(600), new Some("italic"),  "/public/fonts/GHGuardianHeadline-SemiboldItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(700), new None, "/public/fonts/GHGuardianHeadline-Bold.ttf")}
    ${fontFace("Guardian Headline", new Some(700), new Some("italic"), "/public/fonts/GHGuardianHeadline-BoldItalic.ttf")}

    ${fontFace("Guardian Icons", new None, new None, "/public/fonts/icons.otf")}

    font-size: 62.5%;
    background: ${neutral[97]};

    body {
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        font-size: 1.6em;
        line-height: 1.5em;
        overflow-x: hidden;
        display: none;
    }

    figure.element-embed {
        margin: 2em 0
    }

    .js-email-sub__iframe {
        width: 100%;
    }

    .js-email-sub__iframe + figcaption {
        margin-top: -8px;
    }

    video,
    .element-atom iframe,
    .element-audio iframe {
        width: 100%;
    }
`;

const DarkPageStyles = darkModeCss`
    background: ${background.inverse};
`;

interface BodyProps {
    imageSalt: string;
    capi: Content;
}

interface ElementWithResources {
    element: React.ReactElement;
    resources: string[];
}

const WithScript = (props: { src: string; children: ReactNode }): ReactElement =>
    <>
        {props.children}
        <script src={props.src}></script>
    </>

function ArticleBody({ capi, imageSalt }: BodyProps): ElementWithResources {

    const insertAdPlaceholders = getAdPlaceholderInserter(capi.fields?.shouldHideAdverts ?? false);

    const item = fromCapi(JSDOM.fragment)(capi);
    
    const articleScript = '/assets/article.js';
    const liveblogScript = '/assets/liveblog.js';

    if (item.design === Design.Comment) {
        const commentBody = partition(item.body).oks;
        const commentContent =
            insertAdPlaceholders(renderAll(imageSalt)(item.pillar, commentBody));

        return { element: (
            <WithScript src={articleScript}>
                <Opinion imageSalt={imageSalt} item={item}>
                    {commentContent}
                </Opinion>
            </WithScript>
        ), resources: [articleScript] };
    }

    if (item.design === Design.Live) {
        return { element: (
            <WithScript src={liveblogScript}>
                <LiveblogArticle item={item} imageSalt={imageSalt} />
            </WithScript>
        ), resources: [liveblogScript] };
    }

    if (item.display === Display.Immersive) {
        const immersiveBody = partition(item.body).oks;
        const immersiveContent =
            insertAdPlaceholders(renderAll(imageSalt)(item.pillar, immersiveBody));

        return { element: (
            <WithScript src={articleScript}>
                <Immersive imageSalt={imageSalt} item={item}>
                    {immersiveContent}
                </Immersive>
            </WithScript>
        ), resources: [articleScript] };
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article
    ) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(imageSalt)(item.pillar, body));

        return { element: (
            <WithScript src={articleScript}>
                <Standard imageSalt={imageSalt} item={item}>
                    {content}
                </Standard>
            </WithScript>
        ), resources: [articleScript] };
    }

    return { element: <p>Content format not implemented yet</p>, resources: [] };
}

interface Props {
    content: Content;
    imageSalt: string;
}

function Page({ content, imageSalt }: Props): ElementWithResources {
    const twitterScript = includesTweets(content)
        ? <script src="https://platform.twitter.com/widgets.js"></script>
        : null

    const { element, resources } = ArticleBody({ imageSalt, capi: content})

    return { element: (
        <html lang="en" css={[PageStyles, DarkPageStyles]}>
            <head>
                <title>{content.id}</title>
                <meta charSet="UTF-8" />
                <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
            </head>
            <body>
                { element }
                { twitterScript }
            </body>
        </html>
    ), resources };
}


// ----- Export ----- //

export default Page;
