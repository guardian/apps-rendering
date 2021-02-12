import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

interface Props {
	smStart?: number;
	mdStart?: number;
	lgStart?: number;
	smSpan: number;
	mdSpan: number;
	lgSpan: number;
}

export const Column: FC<Props> = ({
	children,
	smStart = 0,
	mdStart = 0,
	lgStart = 0,
	smSpan,
	mdSpan,
	lgSpan,
}) => {
	const styles = css`
		div {
			grid-column-start: ${smStart};
			grid-column-end: span ${smSpan};
		}

		${from.tablet} {
			div {
				grid-column-start: ${mdStart};
				grid-column-end: span ${mdSpan};
			}
		}
		${from.wide} {
			div {
				grid-column-start: ${lgStart};
				grid-column-end: span ${lgSpan};
			}
		}
	`;

	return <div css={styles}>{children}</div>;
};
