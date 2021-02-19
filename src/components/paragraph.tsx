// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { body, textSans } from '@guardian/src-foundations/typography';
import { Format, Special, Theme } from '@guardian/types';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: Format;
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

const Paragraph: FC<Props> = ({ children, format }: Props) => (
	<p css={styles(format.theme)}>{children}</p>
);

// ----- Exports ----- //

export default Paragraph;
