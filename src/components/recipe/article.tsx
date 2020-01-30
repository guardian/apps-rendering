// ----- Imports ----- //
import React, { ReactNode, useState, useEffect } from 'react';
import { css } from '@emotion/core';
import Headline from 'components/standard/headline';
import { articleWidthStyles, basePx, textSans } from 'styles';
import Standfirst from 'components/standard/standfirst';
import Byline from 'components/standard/byline';
import { Keyline } from 'components/shared/keyline';
import HeaderImage from 'components/shared/headerImage';
import { from } from '@guardian/src-foundations/mq';
import { getPillarStyles, Pillar } from 'pillar';

// ----- Styles ----- //

const Styles = css`
    h3 {
        margin-top: 2em;
    }
`;

// ----- Component ----- //

interface Props {
    imageSalt: string;
    article: any;
    children: ReactNode[];
}

interface Ingredient {
    ingredient: string;
    comment?: string;
}

interface Method {
    instruction: string;
    time?: number;
    order: number;
}

interface capiData {
    ingredients: Ingredient[];
    method: Method[]
}

const stickyStyles = (pillar: any) => css`
    padding: ${basePx(1)};
    clear: both;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 1;

    ul {
        padding-left: 0;
        list-style: none;
        margin: 0;

        li {
            &::before {
                content: '';
                background-color: ${getPillarStyles(pillar).kicker};
                width: 1rem;
                height: 1rem;
                border-radius: .5rem;
                display: inline-block;
                margin-right: 6px;
            }
        }
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${from.wide} {
            margin: 0 auto;
        }
    }
`;

export const capiData: capiData = {
    ingredients: [
        {
            ingredient: 'baby potatoes 750g',
            comment: 'skins scrubbed if dirty'
        },
        {
            ingredient: 'peas 250g',
            comment: 'fresh or frozen (if using fresh in the pod, you’ll need just over 500g)'
        },
        {
            ingredient: 'shallots 8',
            comment: 'or 2 banana shallots, thinly sliced'
        },
        {
            ingredient: 'vegetable oil 1 tbsp',
        },
        {
            ingredient: 'creme fraiche 200g',
        },
        {
            ingredient: 'mint leaves 40 (1 loose handful)',
            comment: 'shredded'
        }
    ],
    method: [
        {
            order: 1,
            instruction: "Boil the potatoes in lightly salted water until almost done (when you can insert a knife through them). Add the peas and cook for an additional 2 minutes. Drain into a colander and run cold water over them for a few minutes, then drain again.",
            time: 1200000
        },
        {
            order: 2,
            instruction: "While the potatoes are cooking, saute the shallots in the oil with ¼ teaspoon of salt over a medium heat, stirring frequently, until caramelised and slightly crisp. Tip into a bowl and stir in the creme fraiche.",
        },
        {
            order: 3,
            instruction: "Tip the potatoes and peas into a large bowl and add the shallots and the mint. Stir together and taste for seasoning. Transfer into a clean bowl."
        }
    ]
}

const timeStyles = css`
    h1 {
        margin: 16px 0;
        font-size: 2.8rem;
        ${textSans}
    }
`;

const Ingredients = (props: { capi: capiData }): JSX.Element =>
    <ul>
        {props.capi.ingredients.map(ingredient => {
            return (
                <li>
                    <strong>{ingredient.ingredient}</strong>{ingredient?.comment ? ", " + ingredient.comment : null }
                </li>
            )
        })}
    </ul>

const methodStyles = css`
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
`;

export const Method = (props: { capi: capiData, pillar?: Pillar }): JSX.Element => {
    const [methods, setMethods] = useState(props.capi.method)
    const originalTimes = methods.map(method => method.time);
    const [times, setTimes] = useState(originalTimes);
    const [currentMethodIndex, setCurrentMethodIndex] = useState(0);
    const [runningTimers, setRunningTimers] = useState([false]);

    const resetTimes = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setRunningTimers([false]);
        setTimes(originalTimes);
    }

    const selectMethod = (index: number) => {
        const newState = [...methods.splice(index), ...methods.splice(0, index)]
        setMethods(newState)

        if (currentMethodIndex === index) {
            runningTimers[index] = !runningTimers[index];
            setRunningTimers(runningTimers);
        }

        setCurrentMethodIndex(index);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimes = times.map((time, index) => {
                if (time && time > 0 && runningTimers[index]) {
                    return time - 1000
                } else {
                    return time;
                }
            })
            setTimes(newTimes)
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div id="method-wrapper" className="method-wrapper" css={methodStyles}>{methods.map((method, index) => {
            const time = times[method.order - 1];
            const hours = time ? Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : null;
            const minutes = time ? Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) : null;
            const seconds = time ? Math.floor((time % (1000 * 60)) / 1000) : null;

            const styles = css`
                position: relative;
                width: 85%;
                margin-right: 5%;
                -webkit-flex-shrink: 0;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                display: inline-block;
                border-top: solid 1px #BB3B80;
                border-bottom: solid 1px #dcdcdc;
                border-top: solid 1px #BB3B80;
                background: #F6F6F6;
                padding: 8px;
                margin-top: 0;

                    strong {
                        font-weight: 700;
                        font-size: 2.8rem;
                        padding: ${basePx(0, 1, 0, 0)};
                        color: #BB3B80;
                        display: block;
                        margin-bottom: 0.67em;
                    }

                    span {
                        position: absolute;
                        top: 8px;
                        right: 8px;

                        img {
                            padding: 0 4px;
                        }
                    }

                    .navigation {
                        margin-top: 64px;

                        .back {
                            position: absolute;
                            left: 8px;
                            bottom: 8px;
                        }

                        .forward {
                            position: absolute;
                            right: 8px;
                            bottom: 8px;
                        }
                    }
                `

            return (
                <p key={index} className={`instruction`} css={styles}>
                    <strong>{method.order}</strong>
                    {
                        method.time ?
                            <span>
                                { runningTimers[index]
                                    ? <img onClick={() => selectMethod(index)} src="/assets/icons/Pause.svg"/>
                                    : <img onClick={() => selectMethod(index)} src="/assets/icons/Play.svg"/> }
                                <img onClick={(e) => resetTimes(e, index)} src="/assets/icons/Cancel.svg"/>
                            </span>
                        : null
                    }

                    { time ?
                        <time css={timeStyles}>
                            <h1>{(hours && hours < 10) ? `0${hours}` : hours}:{minutes}:{(seconds && seconds < 10) ? `0${seconds}` : seconds}</h1>
                        </time> : null
                   }

                    {method.instruction}
                    <div className="navigation">
                        { method.order === 1 ? null : <img onClick={() => selectMethod(methods.length - 1)} className="back" src="/assets/icons/Backwards.svg" /> }
                        { method.order === methods.length ? null : <img onClick={() => selectMethod(index + 1)} className="forward" src="/assets/icons/Forward.svg" /> }
                    </div>
                </p>
            )
        })}</div>
    )
}

const Sticky = (props: { children: ReactNode, pillar: any }) =>
    <div css={stickyStyles(props.pillar)}>{ props.children }</div>

const Standard = (props: Props): JSX.Element => {
    return (
        <main css={[Styles]}>
            <HeaderImage
                    image={props.article.mainImage}
                    imageSalt={props.imageSalt}
                    className={HeaderImageStyles}
            />
            <Headline
                headline={props.article.headline}
                article={props.article}
            />
            <Standfirst article={props.article} className={articleWidthStyles} />
            <Keyline {...props.article} />
            <Byline article={props.article} imageSalt={props.imageSalt} />
            <Sticky pillar={props.article.pillar}>
                <p>If you’re lucky enough to be able to source jersey royal potatoes, then these are ideal here; otherwise, use a good, small potato as I have done. When I was growing up in Whanganui, New Zealand, we would head off once a year with Dad and dig up what we called “pig potatoes”, which I think were named after the creatures that would eat the potatoes that hadn’t been harvested by machine – if we didn’t get to them first! Serve this warm or at room temperature.</p>
                <h3>Ingredients</h3>
                <Ingredients capi={capiData}></Ingredients>
                <h3>Method</h3>
                <Method capi={capiData} pillar={props.article.pillar}></Method>
            </Sticky>
        </main>
    )
}


// ----- Exports ----- //

export default Standard;
