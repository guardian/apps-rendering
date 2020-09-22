import React, { FC } from 'react';
import { SerializedStyles, css } from '@emotion/core';
import { basePx } from 'styles';
import { neutral } from '@guardian/src-foundations/palette';
import { SvgSpeechBubble } from '@guardian/src-icons';

interface CommentCountProps {
    count: number;
    colour: string;
    className?: SerializedStyles;
}

const CommentCountStyles = (colour: string): SerializedStyles => css`
    float: right;
    display: inline-block;
    text-align: right;
    margin-top: -6px;
    margin-right: -2px;
    border-left: 1px solid ${neutral[86]};
    box-sizing: border-box;

    span::before {
       
        display: block;
        font-size: 1.4rem;
       
        color: ${colour};
    }

    button {
        padding: ${basePx(1, 1, 0, 0)};
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.4rem;
        border: none;
        color: ${colour};
        margin-top: -10px;
        margin-left: -5px;
    }

    svg {

            width: 2.0rem;
            fill: ${colour};
            padding-top: 3px;
        
    }
`

// const greg = css `
//     fill: green;

// `
export const CommentCount: FC<CommentCountProps> = ({ count, colour, className }) => {
    return <div css={[CommentCountStyles(colour), className]}>
        <div><SvgSpeechBubble/></div>
        <button>{count}</button>
    </div>
}