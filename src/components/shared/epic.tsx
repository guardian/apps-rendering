// ----- Imports ----- //

import React, { useState, useEffect, useRef } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming'
import { from } from '@guardian/src-foundations/mq';
import { brandAltBackground, neutral,  } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { SvgArrowRightStraight } from "@guardian/src-icons"
import { Button, buttonReaderRevenue } from '@guardian/src-button';
import { body, headline } from '@guardian/src-foundations/typography';

import { acquisitionsClient } from 'native/nativeApi';


// ----- Styles ----- //

const EpicStyles = (): SerializedStyles => css`
        width: calc(100% - ${remSpace[2]} - ${remSpace[2]} - ${remSpace[2]} - ${remSpace[2]});
        margin: ${remSpace[2]};

        ${from.wide} {
            margin: ${remSpace[2]} 0;
        }

        clear: both;

        border-top: 1px solid ${brandAltBackground.primary};
        background: ${neutral[97]};
        padding: ${remSpace[2]};
        ${body.medium()}
        clear: left;

        h1:first-of-type {
            ${headline.large()}
        }

        button {
            margin: 0 ${remSpace[2]} ${remSpace[2]} 0;
        }

        .button-container {
            margin-top: ${remSpace[9]};
        }

        svg {
            margin-left: ${remSpace[2]};
            margin-top: -${remSpace[1]};
            vertical-align: middle;
        }

        mark {
            background: ${brandAltBackground.primary};
            padding: .1rem .125rem;
        }
`;


// ----- Component ----- //

interface EpicProps {
    title: string;
    body: string;
    firstButton: string;
    secondButton: string | undefined;
}

const isElementPartiallyInViewport = (el: React.MutableRefObject<HTMLDivElement>): boolean => {
    const rect = el.current.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    return (vertInView && horInView);
}

const debounce = (fn: () => void, time: number): () => void => {
    let timeout: NodeJS.Timeout;
    return function(...args: []): void {
        const functionCall = (): void => fn(...args);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

function Epic({ title, body, firstButton, secondButton }: EpicProps): React.ReactElement | null {
    const [impressionSeen, setImpressionSeen] = useState(false);    
    const epicContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const handleSeenEpic = debounce(() => {
            if (!impressionSeen && isElementPartiallyInViewport(epicContainer)) {
                void acquisitionsClient.epicSeen();
                setImpressionSeen(true);
            }
        }, 100);
        window.addEventListener('scroll', handleSeenEpic);
        return (): void => {
            window.removeEventListener('scroll', handleSeenEpic);
        }
    }, [impressionSeen]);

    const epicButton = (text: string, action: () => Promise<void>): JSX.Element =>
        <Button onClick={action} iconSide="right" icon={<SvgArrowRightStraight />}>
            {text}
        </Button>

    return (
        <div css={EpicStyles} ref={epicContainer}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
            <div className="button-container">
                <ThemeProvider theme={buttonReaderRevenue}>
                    {epicButton(firstButton, () => acquisitionsClient.launchFrictionScreen())}
                    {secondButton
                        ? epicButton(secondButton, () => acquisitionsClient.launchFrictionScreen())
                        : null}
                </ThemeProvider>
            </div>
        </div>
    )
}


// ----- Exports ----- //

export default Epic;
