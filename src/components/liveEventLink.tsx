import { css, SerializedStyles } from '@emotion/core';
import { neutral, remSpace } from "@guardian/src-foundations";
import { basePx, darkModeCss } from "styles";
import { textSans, headline } from "@guardian/src-foundations/typography";
import React, { ReactElement } from "react";
import { SvgGuardianLiveLogo } from '@guardian/src-brand'

const richLinkWidth = '8.75rem';

type LiveEventLinkProps = {
    url: string;
    linkText: string;
    price?: string;
    image?: string;
    start?: string;
}

const liveEventLinkStyles: SerializedStyles =
    css`
        background: ${neutral[97]};

        a {
            display: inline-block;
            text-decoration: none;
            color: ${neutral[7]};

            div {
                background: #B84376;
                color: white;
                padding: ${remSpace[2]} ${remSpace[9]} ${remSpace[2]} ${remSpace[2]};

                svg {
                    fill: currentColor;
                }
            }

            img {
                width: 100%;
            }
    
            section {
                padding: ${remSpace[2]};
                ${textSans.xsmall()};

                h1 {
                    margin: 0 0 ${remSpace[2]} 0;
                    ${headline.xxxsmall({ fontWeight: 'bold' })}
                    hyphens: auto;
                }

                p {
                    margin-top: 0;
                }
    
                button {
                    background: none;
                    border: none;
                    ${textSans.small()};
                    padding: 0;
                    margin: 0;
                    background: #B84376;
                    color: ${neutral[100]};
                    border-radius: 1.5rem;
                    padding: 0 ${remSpace[3]};
                }
            }
        }

        float: left;
        clear: left;
        margin: ${basePx(1, 2, 1, 0)};
        margin: ${remSpace[2]} ${remSpace[4]} ${remSpace[2]} 0;

        width: ${richLinkWidth};

        ${darkModeCss`
            background-color: ${neutral[20]};
            button::before {
                border-color: ${neutral[60]};
            }

            a, h1, button {
                color: ${neutral[60]};
            }
        `}
    `;

const LiveEventLink = (props: LiveEventLinkProps): ReactElement => {
    const { url, image, linkText, start, price } = props;
    const headerImage = image ? <img src={image} alt="Live event"/> : null;
    return <aside css={liveEventLinkStyles}>
        <a href={url}>
            <div><SvgGuardianLiveLogo /></div>
            { headerImage }
            <section>
                <h1>{ linkText }</h1>
                <time>{ start }</time>
                <p>{ price }</p>
                <button>Book now</button>
            </section>
        </a>
    </aside>
}


export default LiveEventLink;
