import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

interface Props {
	smCols?: number;
	mdCols?: number;
	lgCols?: number;
	className?: string;
}

const Grid: FC<Props> = ({
	children,
	smCols = 12,
	mdCols = 12,
	lgCols = 12,
	className,
}) => {
	const styles = css`
		display: grid;
		grid-column-gap: 16px;
		grid-template-columns: repeat(${smCols}, 1fr);

		${from.tablet} {
			grid-template-columns: repeat(${mdCols}, 1fr);
		}

		${from.wide} {
			grid-column-gap: 24px;
			grid-template-columns: repeat(${lgCols}, 1fr);
		}
	`;

	return (
		<div css={[styles]} className={className}>
			{children}
		</div>
	);
};

export default Grid;
