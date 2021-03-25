// ----- Imports ----- //

import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	url: string;
	title: Option<string>;
}

const styles = css`
	margin: ${remSpace[4]} 0;

	${darkModeCss`
        padding: ${remSpace[4]};
        background: ${neutral[100]};
    `}
`;

const Interactive: FC<Props> = ({ url, title }) => (
	<figure css={styles} className="interactive">
		<iframe src={url} height="500" title={withDefault('')(title)} />
	</figure>
);

// ----- Exports ----- //

export default Interactive;
