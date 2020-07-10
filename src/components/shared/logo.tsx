import React, { FC } from 'react';
import Anchor from 'components/anchor';
import { css, SerializedStyles } from '@emotion/core';
import { Logo } from 'capi';
import { Format } from '@guardian/types/Format';
import { darkModeCss } from 'styles';
import { remSpace } from '@guardian/src-foundations';
import { text, neutral } from '@guardian/src-foundations/palette';
import { Branding } from '@guardian/apps-rendering-api-models/branding';
import { Item, getFormat } from 'item';
import { pipe2 } from 'lib';
import { map, withDefault } from 'types/option';
import { textSans } from '@guardian/src-foundations/typography';

interface Props {
    branding: Branding;
    format: Format;
}

const styles = (lightModeImage: string): SerializedStyles => css`
    margin: ${remSpace[9]} 0;
    ${textSans.small()}

    label {
        color: ${text.supporting};
    }

    img {
        content: url("${lightModeImage}");
        display: block;
        margin: ${remSpace[2]} 0;
        max-height: 60px;
    }
`;

const darkStyles = (lightModeImage: string, darkModeImage?: string): SerializedStyles => darkModeCss`
    label {
        color: ${neutral[86]};
    }

    img {
        content: url("${darkModeImage ?? lightModeImage}");
    }
`;

const OptionalLogo = (item: Item): JSX.Element => pipe2(
    item.branding,
    map(branding => <Logo branding={branding} format={getFormat(item)} />),
    withDefault(<></>)
)

const Logo: FC<Props> = ({ branding, format }: Props) => {
    return (
        <section css={[styles(branding.logo), darkStyles(branding.logo, branding.altLogo)]}>
            <label>{branding.label}</label>
            <a href={branding.sponsorUri}>
                <img alt={branding.sponsorName} />
            </a>
            <Anchor href={branding.aboutUri} format={format} >
                About this content
            </Anchor>
        </section>
    )
}

export default OptionalLogo;
