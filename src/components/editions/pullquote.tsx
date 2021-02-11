import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons/quote';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { useItemExtras } from 'itemContext';
import { pipe2 } from 'lib';
import type { FC, ReactNode } from 'react';

export const pullquoteWidth = '10.875rem';
const pullquoteTailSize = '1.5rem';

const styles = (kickerColor: string): SerializedStyles => {
	return css`
		width: ${pullquoteWidth};
		position: relative;
		box-sizing: border-box;
		padding: 0 0.5rem 1.5rem 0.5rem;
		margin: 0.375rem 1rem calc(1rem + ${pullquoteTailSize}) 0;

		color: ${kickerColor};
		border: 1px solid ${kickerColor};
		border-top: 0.75rem solid ${kickerColor};
		border-bottom: none;

		float: left;
		clear: left;
		${from.wide} {
			float: right;
			clear: right;
			margin-right: calc(-${pullquoteWidth} - 2.5rem);
		}

		&:before {
			content: '';
			position: absolute;
			top: 100%;
			left: -1px;
			width: ${pullquoteTailSize};
			height: ${pullquoteTailSize};
			border: 1px solid ${kickerColor};
			border-top: none;
			border-radius: 0 0 100% 0;
		}

		&:after {
			content: '';
			position: absolute;
			top: 100%;
			left: calc(${pullquoteTailSize} + 1px);
			width: calc(100% - ${pullquoteTailSize});
			height: 1px;
			border-top: 1px solid ${kickerColor};
		}
	`;
};

const quoteStyles = (kickerColor: string): SerializedStyles => {
	return css`
		margin: 0;
		${headline.xxsmall({ fontWeight: 'regular' })}
		svg {
			margin-bottom: -0.6rem;
			height: 2rem;
			margin-left: -0.3rem;
			fill: ${kickerColor};
		}
	`;
};

const citeStyles = css`
	font-style: normal;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

type Props = {
	quote: string;
	attribution: Option<string>;
};

const blockQuoteStyles = css`
	margin: 0;
`;

const Pullquote: FC<Props> = ({ quote, attribution }) => {
	const {
		themeStyles: { kicker },
	} = useItemExtras();
	const quoteElement = (
		<p css={quoteStyles(kicker)}>
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
		<aside css={styles(kicker)}>
			<blockquote css={blockQuoteStyles}>{children}</blockquote>
		</aside>
	);
};

export default Pullquote;
