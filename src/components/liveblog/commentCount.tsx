import React, { FC } from 'react';
import { SerializedStyles, css } from '@emotion/core';
import { basePx, icons } from 'styles';
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
    border-left: 1px solid ${neutral[86]};
    box-sizing: border-box;

    span::before {
        ${icons};
        display: block;
        font-size: 1.4rem;
        content: '\\e03c';
        color: ${colour};
    }

    button {
        padding: ${basePx(1, 1, 2, 1)};
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.4rem;
        border: none;
        color: ${colour};
    }

    svg {
        
            background-color: pink;
            width: 1.8rem;
            height: 3.9rem;
        
    }
`

const greg = css `
    fill: green;

`
export const CommentCount: FC<CommentCountProps> = ({ count, colour, className }) => {
    return <div css={[CommentCountStyles(colour), className]}>
        <span css={greg}><SvgSpeechBubble/></span>
        <button>{count}</button>
    </div>
}