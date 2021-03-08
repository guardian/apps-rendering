// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { background, border, neutral } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Display, partition } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { renderEditionsAll } from 'renderer';
import { Column } from '../grid/Column';
import Container from '../grid/Container';
import Grid from '../grid/Grid';
import Header from '../header';
import {
	headerBackgroundColour,
	tabletContentWidth,
	wideContentWidth,
} from '../styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Component ----- //

interface Props {
	item: Item;
}

const mainStyles = css`
	height: 100%;
`;

const articleWrapperStyles = (item: Format): SerializedStyles => css`
	min-height: 100%;
	background-color: ${item.design === Design.Media ? neutral[7] : 'inherit'};
`;

const articleStyles = css``;

const headerStyles = css``;

const bodyStyles = css`
	iframe {
		width: 100%;
		border: none;
	}

	figcaption {
		background: ${background.primary};
		padding-bottom: ${remSpace[2]};
	}

	${from.tablet} {
		p {
			margin: 0;
			padding-top: ${remSpace[2]};
			padding-bottom: ${remSpace[2]};
			border-right: 1px solid ${border.secondary};
			padding-right: 16px;
		}
	}
`;

export const galleryWrapperStyles = css`
	box-sizing: border-box;
	padding-top: ${remSpace[3]};
	padding-right: 0;
	padding-left: 0;
	border: none;

	${from.tablet} {
		width: ${tablet}px;
		padding-right: ${remSpace[4]};
		border-right: 1px solid ${neutral[100]};
	}

	${from.desktop} {
		width: ${wide}px;
	}
`;

const headerBackgroundStyles = (format: Format): SerializedStyles => css`
	background-color: ${headerBackgroundColour(format)};
`;

const getSectionStyles = (item: Format): SerializedStyles[] => {
	if (
		item.design === Design.Interview ||
		item.design === Design.Media ||
		item.display === Display.Immersive
	) {
		return [];
	}
	return [headerStyles, articleStyles];
};

const Article: FC<Props> = ({ item }) => {
	if (
		item.design === Design.Analysis ||
		item.design === Design.Article ||
		item.design === Design.Comment ||
		item.design === Design.Review ||
		item.design === Design.Interview ||
		item.design === Design.Feature ||
		item.design === Design.Media ||
		item.design === Design.GuardianView
	) {
		return (
			<main css={mainStyles}>
				<article css={articleWrapperStyles(item)}>
					<div css={headerBackgroundStyles(item)}>
						<section css={getSectionStyles(item)}>
							<Header item={item} />
						</section>
					</div>
					<div
						css={[
							item.design === Design.Media
								? galleryWrapperStyles
								: null,
						]}
					>
						<Container>
							<Grid smCols={12} mdCols={12} lgCols={12}>
								<Column smSpan={12} mdSpan={8} lgSpan={6}>
									<section css={bodyStyles}>
										{renderEditionsAll(
											item,
											partition(item.body).oks,
										)}
									</section>
								</Column>
							</Grid>
						</Container>
					</div>
				</article>
			</main>
		);
	}

	return <p>Not implemented</p>;
};

// ----- Exports ----- //

export default Article;
