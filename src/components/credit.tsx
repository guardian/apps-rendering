// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Format, Design } from '@guardian/types/Format';
import { Option, map, withDefault } from '@guardian/types/option';

import { pipe2 } from 'lib';


// ----- Component ----- //

interface Props {
    credit: Option<string>;
    format: Format;
}

const styles = css`
    ${textSans.xsmall()}
    margin: ${remSpace[1]} 0;
`;

const Credit: FC<Props> = ({ format, credit }) =>
    pipe2(
        credit,
        map(cred => {
            switch (format.design) {
                case Design.Media:
                    return <p css={styles}>{cred}</p>;
                default:
                    return <> {cred}</>;
            }
        }),
        withDefault<ReactElement | null>(null),
    );


// ----- Exports ----- //

export default Credit;
