import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import type { Option, Theme } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import type { Series } from 'capi';
import { pipe2 } from 'lib';
import React from 'react';
import type { FC, ReactElement } from 'react';
import { getThemeStyles } from 'themeStyles';
import type { ThemeStyles } from 'themeStyles';

const ArticleSeriesStyles = ({
	inverted,
}: ThemeStyles): SerializedStyles => css`
	a {
		${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
		color: ${inverted};
		text-decoration: none;
	}
`;

interface ArticleSeriesProps {
	series: Option<Series>;
	theme: Theme;
}

const ArticleSeries: FC<ArticleSeriesProps> = (props) =>
	pipe2(
		props.series,
		map((series) => (
			<nav css={ArticleSeriesStyles(getThemeStyles(props.theme))}>
				<a href={series.webUrl}>{series.webTitle}</a>
			</nav>
		)),
		withDefault<ReactElement | null>(null),
	);

export default ArticleSeries;
