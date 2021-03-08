import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

const Container: FC = ({ children }) => {
	const styles = css`
		max-width: 100%;
		box-sizing: border-box;
		margin: 0 1rem;

		${from.wide} {
			margin-left: 9rem;
		}
	`;

	return <div css={styles}>{children}</div>;
};

export default Container;
