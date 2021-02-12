import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

interface Props {
	smCols: number;
	mdCols: number;
	lgCols: number;
}

const Grid: FC<Props> = ({ children, smCols, mdCols, lgCols }) => {
	const styles = css`
		div {
			display: grid;
			grid-column-gap: 16px;
			grid-row-gap: 16px;
			grid-template-columns: repeat(${smCols}, 1fr);
		}

		${from.tablet} {
			div {
				grid-template-columns: repeat(${mdCols}, 1fr);
			}
		}

		${from.wide} {
			div {
				grid-column-gap: 24px;
				grid-row-gap: 24px;
				grid-template-columns: repeat(${lgCols}, 1fr);
			}
		}
	`;

	return <div css={styles}>{children}</div>;
};

export default Grid;
