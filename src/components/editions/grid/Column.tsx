import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

interface Props {
	smStart?: number;
	mdStart?: number;
	lgStart?: number;
	smSpan?: number;
	mdSpan?: number;
	lgSpan?: number;
	className?: SerializedStyles;
}

export const Column: FC<Props> = ({
	children,
	smStart = 0,
	mdStart = 0,
	lgStart = 0,
	smSpan = 12,
	mdSpan = 12,
	lgSpan = 12,
	className,
}) => {
	const styles = css`
		grid-column-start: ${smStart};
		grid-column-end: span ${smSpan};

		${from.tablet} {
			grid-column-start: ${mdStart};
			grid-column-end: span ${mdSpan};
		}

		${from.wide} {
			grid-column-start: ${lgStart};
			grid-column-end: span ${lgSpan};
		}
	`;

	return <div css={[styles, className]}>{children}</div>;
};
