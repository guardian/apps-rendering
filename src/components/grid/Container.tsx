import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';

const Container: FC = ({ children }) => {
	const styles = css`
		div {
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 1rem;
		}

		${from.wide} {
			div {
				padding: 0 2.5rem;
				max-width: 80rem;
				margin-left: auto;
				margin-right: auto;
			}
		}
	`;

	return <div css={styles}>{children}</div>;
};

export default Container;
