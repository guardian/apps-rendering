// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { background, border } from '@guardian/src-foundations/palette';
import { Design, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import Header from './header';
import { editionsArticleWidth } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const articleStyles = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.phablet} {
		padding-left: 0;
		padding-right: 0;
	}
`;

const bodyStyles = css`
	border-top: 1px solid ${border.secondary};
	padding-top: ${remSpace[4]};

	figcaption {
		background: ${background.primary};
		padding-bottom: ${remSpace[2]};
	}

	p {
		padding-right: ${remSpace[1]};
	}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};

		p {
			margin: 0;
			padding-top: ${remSpace[2]};
			padding-bottom: ${remSpace[2]};
		}
	}

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		margin-left: ${remSpace[24]};
		width: ${editionsArticleWidth}rem;
	}
`;

const Article: FC<Props> = ({ item }) => {
	if (item.design === Design.Live) {
		return <p>Not implemented</p>;
	}

	return (
		<main>
			<article css={articleStyles}>
				<Header item={item} />
				<section css={[bodyStyles]}>
					{renderEditionsAll(item, partition(item.body).oks)}
				</section>
			</article>
		</main>
	);
};

// ----- Exports ----- //

export default Article;
