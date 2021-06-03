// ----- Section ----- //

import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Sub-Components ----- //

interface ClientJsProps {
	src: Option<string>;
}

const ClientJs: FC<ClientJsProps> = ({ src }) =>
	pipe(
		src,
		map((s) => <script src={s}></script>),
		withDefault<ReactElement | null>(null),
	);

// ----- Component ----- //

interface Props {
	clientScript: Option<string>;
	twitter: boolean;
	inlineClientJS?: string;
}

const Scripts: FC<Props> = ({ clientScript, twitter, inlineClientJS }) => (
	<>
		<ClientJs src={clientScript} />
		{twitter && (
			<script src="https://platform.twitter.com/widgets.js"></script>
		)}
		{inlineClientJS && <script>${inlineClientJS}</script>}
	</>
);

// ----- Exports ----- //

export default Scripts;
