// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { body, textSans } from '@guardian/src-foundations/typography';
import type { Format, Theme } from '@guardian/types';
import { Special } from '@guardian/types';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	text?: string;
	format: Format;
	key: number;
}

const styles = (theme: Theme): SerializedStyles => {
	const labs = theme === Special.Labs ? textSans.medium() : null;

	return css`
		${body.medium()}
		overflow-wrap: break-word;
		margin: 0 0 ${remSpace[3]};

		${labs}
	`;
};

const Span: FC<Props> = ({ format, text, key }: Props) => (
	<span css={styles(format.theme)} key={key}>
		{text}
	</span>
);

// ----- Exports ----- //

export default Span;
