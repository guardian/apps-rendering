// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { titlepiece } from '@guardian/src-foundations/typography';
import { news } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import { maybeRender } from 'lib';


// ----- Component ----- //

const styles = css`
    ${titlepiece.small()}
    color: ${news[400]};
    font-size: 17px;
    padding: ${remSpace[1]} 0 ${remSpace[2]};
`;

interface Props {
    item: Item;
}

const Series: FC<Props> = ({ item }) =>
    maybeRender(item.series, series =>
        <nav css={styles}>
            {series.webTitle}
        </nav>
    )


// ----- Exports ----- //

export default Series;
