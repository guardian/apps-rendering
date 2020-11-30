// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Format } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import Img from 'components/img';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';
import React from 'react';
import { darkModeCss } from 'styles';

// ----- Styles ----- //

const styles = css`
	position: relative;
`;

const imageStyles = css`
	position: absolute;
	height: 160px;
	right: 0;
	top: -48px;
	background: none;

	${darkModeCss`
        background: none;
    `}
`;

// ----- Component ----- //

interface Props {
	contributors: Contributor[];
	className: SerializedStyles;
	format: Format;
}

const Cutout: FC<Props> = ({ contributors, className, format }) => {
	const [contributor] = contributors;

	if (!isSingleContributor(contributors)) {
		return null;
	}

	return pipe2(
		contributor.image,
		map((image) => (
			<div css={[className, styles]}>
				<Img
					image={image}
					sizes="12rem"
					className={imageStyles}
					format={format}
				/>
			</div>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Cutout;
