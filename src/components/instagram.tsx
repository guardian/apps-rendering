// ----- Imports ----- //

import type { FC } from 'react';

// ----- Functions ----- //

const instagramUrl = (id: string): string =>
	`https://www.instagram.com/p/${id}/embed`;

// ----- Component ----- //

interface Props {
	id: string;
}

const Instagram: FC<Props> = ({ id }) => (
	<iframe src={instagramUrl(id)} height="830" />
);

// ----- Exports ----- //

export default Instagram;
