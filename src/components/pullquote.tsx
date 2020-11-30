import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons/quote';
import type { Format } from '@guardian/types/Format';
import { map, withDefault } from '@guardian/types/option';
import type { Option } from '@guardian/types/option';
import { pipe2 } from 'lib';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

const styles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);
	return css`
		color: ${kicker};
		margin: 0;
		${headline.xsmall({ fontWeight: 'light' })};
		${darkModeCss`color: ${inverted};`}
	`;
};

const quoteStyles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	return css`
		margin: ${remSpace[4]} 0 ${remSpace[2]} 0;

		svg {
			margin-bottom: -0.6rem;
			height: 2.3rem;
			margin-left: -0.3rem;
			line-height: 1.2;
			fill: ${kicker};
			${darkModeCss`fill: ${inverted};`}
		}
	`;
};

const citeStyles = css`
	font-style: normal;
`;

type Props = {
	quote: string;
	format: Format;
	attribution: Option<string>;
};

const blockQuoteStyles = css`
	margin-left: 0;
`;

const Pullquote: FC<Props> = ({ quote, attribution, format }) => {
	const quoteElement = (
		<p css={quoteStyles(format)}>
			<SvgQuote />
			{quote}
		</p>
	);
	const children = pipe2(
		attribution,
		map((attribution) => [
			quoteElement,
			<cite key={attribution} css={citeStyles}>
				{attribution}
			</cite>,
		]),
		withDefault<ReactNode>([quoteElement]),
	);

	return (
		<aside css={styles(format)}>
			<blockquote css={blockQuoteStyles}>{children}</blockquote>
		</aside>
	);
};

export default Pullquote;
