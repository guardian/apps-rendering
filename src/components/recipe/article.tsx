// ----- Imports ----- //

import React, { ReactNode, useState } from 'react';
import { css } from '@emotion/core';
import Headline from 'components/standard/headline';
import { articleWidthStyles, basePx, icons, textSans } from 'styles';
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
    time: number;
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
    background: #F6F6F6;

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
            time: 1800000
        },
        {
            order: 2,
            instruction: "While the potatoes are cooking, saute the shallots in the oil with ¼ teaspoon of salt over a medium heat, stirring frequently, until caramelised and slightly crisp. Tip into a bowl and stir in the creme fraiche.",
            time: 1200000
        },
        {
            order: 3,
            instruction: "Tip the potatoes and peas into a large bowl and add the shallots and the mint. Stir together and taste for seasoning. Transfer into a clean bowl.",
            time: 600000
        }
    ]
}

const timeStyles = css`
    h1 {
        margin: 16px 0;
        ${textSans}
    }
`;

const Timer = (props: {time: number}): JSX.Element => {
    const hours = Math.floor((props.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((props.time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((props.time % (1000 * 60)) / 1000);

    return (
        <time css={timeStyles}>
            <h1>{hours}:{minutes}:{seconds}</h1>
        </time>
    )
}

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

    const selectMethod = (index: number) => {
        const newState = [...methods.splice(index), ...methods.splice(0, index)]
        setMethods(newState)
    }

    return (
        <div id="method-wrapper" className="method-wrapper" css={methodStyles}>{methods.map((method, index) => {
            const styles = css`
            width: 85%;
            margin-right: 5%;
            -webkit-flex-shrink: 0;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            display: inline-block;
            border-top: solid 1px #BB3B80;
            border-bottom: solid 1px #dcdcdc;
            border-top: solid 1px #BB3B80;
            background: white;
            padding: 8px;
            margin-top: 0;

                strong {
                    font-weight: 700;
                    font-size: 2.8rem;  
                    padding: ${basePx(0, 1, 0, 0)};
                    color: #BB3B80;
                }

                span {
                    &::after {
                        ${icons}
                        content: "\\e002";
                        font-size: 16px;
                    }
                }
            `
            return (
                <p className={`instruction`} onClick={() => selectMethod(index)} css={styles}>
                    <strong>{method.order}</strong>
                    <Timer time={method.time}></Timer>
                    {method.instruction}
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
