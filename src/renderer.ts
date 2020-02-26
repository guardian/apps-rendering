// ----- Imports ----- //

import { ReactNode, createElement as h, ReactElement } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';

import { Option, fromNullable, Some, None } from 'types/option';
import { srcset, src } from 'image';
import { basePx, icons, headlineFont, darkModeCss, textSans } from 'styles';
import { getPillarStyles, Pillar } from 'pillar';
import { ElementKind, BodyElement } from 'item';


// ----- Renderer ----- //

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const getAttrs = (node: Node): Option<NamedNodeMap> =>
    isElement(node) ? new Some(node.attributes) : new None();

const getAttr = (attr: string) => (node: Node): Option<string> =>
    getAttrs(node).andThen(attrs =>
        fromNullable(attrs.getNamedItem(attr)).fmap(attr => attr.value)
    );

const getHref: (node: Node) => Option<string> =
    getAttr('href');

const Paragraph = (props: { children?: ReactNode }): ReactElement =>
    styledH('p', { css: css`overflow-wrap: break-word` }, props.children);

const anchorStyles = (colour: string): SerializedStyles => css`
    color: ${colour};
    text-decoration: none;
    padding-bottom: 0.15em;
    background-image: linear-gradient(${colour}66 0%, ${colour}66 100%);
    background-repeat: repeat-x;
    background-size: 1px 1px;
    background-position: 0 bottom;
`;

const Anchor = (props: { href: string; text: string; pillar: Pillar }): ReactElement =>
    styledH(
        'a',
        { css: anchorStyles(getPillarStyles(props.pillar).kicker), href: props.href },
        props.text,
    );

const listStyles = (colour: string): SerializedStyles => css`
    list-style: none;
    padding-left: 0;
`

const listItemStyles: SerializedStyles = css`
    padding-left: 2rem;
    line-height: 2.2rem;
    padding-bottom: 0.375rem;

    &::before {
        display: inline-block;
        content: '';
        border-radius: 0.5rem;
        height: 1rem;
        width: 1rem;
        margin-right: 1rem;
        background-color: ${neutral[86]};
        margin-left: -2rem;
    }

    > p:first-of-type {
        display: inline;
    }
`

const bulletStyles = (colour: string): SerializedStyles => css`
    color: transparent;
    display: inline-block;

    &::before {
        content: '';
        background-color: ${colour};
        width: 1rem;
        height: 1rem;
        border-radius: .5rem;
        display: inline-block;
    }
`;

const HeadingTwoStyles = css`
    font-size: 1.8rem;
    line-height: 2.2rem;
    margin: 1rem 0 4px 0;
    font-weight: 700;

    & + p {
        margin-top: 0;
    }
`

const HorizontalRuleStyles = css`
    display: block;
    width: 8.75rem;
    height: 0.125rem;
    margin: 0;
    border: 0;
    margin-top: 3rem;
    margin-bottom: 0.1875rem;
    background-color: ${neutral[93]};
`

const TweetStyles = css`
    ${until.wide} {
        clear: both;
    }
`;

const Bullet = (props: { pillar: Pillar; text: string }): ReactElement =>
    styledH('p', { css: css`display: inline` },
        styledH('span', { css: bulletStyles(getPillarStyles(props.pillar).kicker) }, '•'),
        props.text.replace(/•/, ''),
        null
    );

const HeadingTwo = (props: { children?: ReactNode }): ReactElement =>
    styledH('h2', { css: HeadingTwoStyles }, props.children );

const HorizontalRule = (): ReactElement =>
    styledH('hr', { css: HorizontalRuleStyles }, null)

const transform = (text: string, pillar: Pillar): ReactElement | string => {
    if (text?.includes('•')) {
        return h(Bullet, { pillar, text });
    } else if (text?.includes('* * *')) {
        return h(HorizontalRule, null, null);
    }
    return text;
}

const textElement = (pillar: Pillar) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(textElement(pillar));
    switch (node.nodeName) {
        case 'P':
            return h(Paragraph, { key }, children);
        case '#text':
            return transform(text, pillar);
        case 'SPAN':
            return text;
        case 'A':
            return h(Anchor, { href: getHref(node).withDefault(''), text, pillar, key }, children);
        case 'H2':
            return h(HeadingTwo, { key }, children);
        case 'BLOCKQUOTE':
            return h('blockquote', { key }, children);
        case 'STRONG':
            return h('strong', { key }, children);
        case 'EM':
            return h('em', { key }, children);
        case 'BR':
            return h('br', { key }, null);
        case 'UL':
            return styledH('ul', { css: listStyles }, children);
        case 'LI':
            return styledH('li', { css: listItemStyles }, children);
        case 'MARK':
            return styledH('mark', { key }, children);
        default:
            return null;
    }
}

const text = (doc: DocumentFragment, pillar: Pillar): ReactNode[] =>
    Array.from(doc.childNodes).map(textElement(pillar));

interface ImageProps {
    url: string;
    alt: string;
    salt: string;
    sizes: string;
    width: number;
    height: number;
    captionString: string;
    caption: DocumentFragment;
    credit: string;
    pillar: Pillar;
}

type FigureElement = ImageProps & {
    className?: SerializedStyles;
}

const imageStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(100vw * ${height / width});
    background: ${neutral[97]};

    ${from.phablet} {
        height: calc(620px * ${height / width});
    }
`;

const ImageElement = (props: ImageProps): ReactElement | null => {
    const { url, sizes, salt, alt, width, height, credit, captionString } = props;

    if (!url) {
        return null;
    }

    return styledH('img', {
        sizes,
        srcSet: srcset(url, salt),
        alt,
        className: 'js-launch-slideshow',
        src: src(salt, url, 500),
        css: imageStyles(width, height),
        caption: captionString,
        credit,
    });
}

const FigureElement = (props: FigureElement): ReactElement =>
    styledH('figure', { css: props.className },
        h(ImageElement, props),
        h('figcaption', null, text(props.caption, props.pillar)),
    );

const bodyImageStyles = css`
    margin-left: ${basePx(-1)};
    margin-right: ${basePx(-1)};

    ${from.phablet} {
        margin-left: 0;
        margin-right: 0;
    }

    ${from.wide} {
        margin: 1em 0;
    }

    img {
        width: 100%; 
    }

    figcaption {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: ${neutral[46]};
        ${textSans}

        ${until.phablet} {
            padding-left: ${basePx(1)};
            padding-right: ${basePx(1)};
        }
    }
`;

const BodyImage = (props: Omit<FigureElement, 'sizes'>): ReactElement =>
    h(FigureElement, { ...props, sizes: '100vw', className: bodyImageStyles });

const pullquoteStyles = (colour: string): SerializedStyles => css`
    font-weight: 200;
    font-size: 2.2rem;
    line-height: 1.3;
    color: ${colour};
    ${headlineFont}
    margin: 0;

    blockquote {
        margin-left: 0;
    }

    p {
        margin: 1em 0;

        &::before {
            ${icons}
            font-size: 2.2rem;
            content: '\\e11c';
            display: inline-block;
            margin-right: ${basePx(1)};
        }
    }

    footer {
        font-size: 1.8rem;
        margin-top: 4px;

        cite {
            font-style: normal;
        }
    }
`;

type PullquoteProps = {
    quote: string;
    attribution: Option<string>;
    pillar: Pillar;
};

const Pullquote = (props: PullquoteProps): ReactElement =>
    styledH('aside', { css: pullquoteStyles(getPillarStyles(props.pillar).kicker) },
        h('blockquote', null,
            h('p', null, props.quote)
        )
    );

const richLinkWidth = '13.75rem';

const richLinkStyles = css`
    background: ${neutral[97]};
    padding: ${basePx(1)};

    h1 {
        margin: ${basePx(0, 0, 2, 0)};
        font-size: 1em;
    }

    p {
        margin: ${basePx(1, 0)};
    }

    span {
        display: none;
    }

    a {
        text-decoration: none;
        background: none;
    }

    float: left;
    clear: left;
    width: ${richLinkWidth};
    margin: ${basePx(1, 2, 1, 0)};

    ${from.wide} {
        margin-left: calc(-${richLinkWidth} - ${basePx(2)} - ${basePx(3)});
    }

    ${darkModeCss`
        border-top: 1px solid ${neutral[60]};
        border-bottom: 1px solid ${neutral[60]};
        a {
            &::before {
                color: ${neutral[60]};
            }
        }
    `}
`;

const RichLink = (props: { url: string; linkText: string; pillar: Pillar }): ReactElement =>
    styledH('aside', { css: richLinkStyles },
        h('h1', null, props.linkText),
        h(Anchor, { href: props.url, pillar: props.pillar, text: 'Read more' }),
    );

const Interactive = (props: { url: string }): ReactElement =>
    h('figure', { className: 'interactive' },
        h('iframe', { src: props.url, height: 500 }, null)
    );

const Tweet = (props: { content: NodeList; pillar: Pillar; key: number }): ReactElement => {
    // twitter script relies on twitter-tweet class being present
    return styledH('blockquote', { key: props.key, className: 'twitter-tweet', css: TweetStyles }, ...Array.from(props.content).map(textElement(props.pillar)));
}

const render = (salt: string, pillar: Pillar) => (element: BodyElement, key: number): ReactNode => {
    switch (element.kind) {

        case ElementKind.Text:
            return text(element.doc, pillar);

        case ElementKind.Image:
            const { file, alt, caption, captionString, credit, width, height } = element;
            return h(BodyImage, {
                url: file,
                alt,
                salt,
                caption,
                captionString,
                credit,
                key,
                width,
                height,
                pillar
            });

        case ElementKind.Pullquote:
            const { quote, attribution } = element;
            return h(Pullquote, { quote, attribution, pillar, key });

        case ElementKind.RichLink:
            const { url, linkText } = element;
            return h(RichLink, { url, linkText, pillar, key });

        case ElementKind.Interactive:
            return h(Interactive, { url: element.url, key });

        case ElementKind.Tweet:
            return h(Tweet, { content: element.content, pillar, key });

        default:
            return null;

    }
}

const renderAll = (salt: string) => (pillar: Pillar, elements: BodyElement[]): ReactNode[] =>
    elements.map(render(salt, pillar));

// ----- Exports ----- //

export {
    renderAll,
    text as renderText,
    ImageElement,
};
