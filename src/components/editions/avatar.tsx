// ----- Imports ----- //

import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { map, none, some, withDefault } from '@guardian/types';
import { useItemExtras } from 'itemExtrasContext';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

const imgStyles = css`
	background: none;
	width: 125px;
`;

const sizes: Sizes = {
	mediaQueries: [],
	default: '105px',
};

const Avatar: FC = () => {
	const {
		contributors: [contributor],
		format,
	} = useItemExtras();

	return pipe2(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={sizes}
				className={some(imgStyles)}
				format={format}
				supportsDarkMode={false}
				lightbox={none}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
