import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, basePx } from '../../styles';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, background } from '@guardian/src-foundations/palette';

const tagsStyles = (background: string = neutral[97]): SerializedStyles => css`
    margin-top: 0;
    margin-bottom: 0;

    display: block;
    list-style: none;
    padding: ${basePx(1, 0, 2, 0)};
    ${textSans.medium()}

    li {
        margin: ${basePx(1, 1, .5, 0)};
        display: inline-block;
        padding: ${basePx(.5, 0)};

        a {
            text-decoration: none;
            white-space: nowrap;
            padding: 6px 16px;
            border-radius: 30px;
            text-overflow: ellipsis;
            max-width: 18.75rem;
            color: ${neutral[7]};
            background-color: ${background};
        }
    }
`;

const tagsDarkStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    li a {
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    }
`;

interface TagsProps {
    tags: {
        webUrl: string;
        webTitle: string;
    }[];
    background?: string;
}

const Tags = ({ tags, background }: TagsProps): JSX.Element => (
    <ul css={[tagsStyles(background), tagsDarkStyles]}>
        {tags.map((tag, index) => {
            return <li key={index}>
                <a href={tag.webUrl}>
                    {tag.webTitle}
                </a>
            </li>
        })}
    </ul>
)

export default Tags;
