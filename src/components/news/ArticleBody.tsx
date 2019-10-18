import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { sidePadding, PillarStyles, darkModeCss, commonArticleStyles } from '../../styles';
import { palette } from '@guardian/src-foundations'
import { render } from "../../renderBlocks";
import { Block } from 'types/capi-thrift-models';
import { Env } from 'server';
import { Reader } from 'types/Reader';

const ArticleBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        float: left;
        clear: left;
        width: 13.75rem;
        margin: 8px 24px 8px 0;
    }

    p {
        ${sidePadding}
    }

    ${commonArticleStyles(pillarStyles)}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    a {
        color: ${inverted};
    }

    figcaption {
        color: ${palette.neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }

    .rich-link,
    .element-membership {
        border-top: 1px solid ${palette.neutral[60]};
        border-bottom: 1px solid ${palette.neutral[60]};
        a {
            &::before {
                color: ${palette.neutral[60]};
            }
        }
    }
`;

interface ArticleBodyProps {
    pillarStyles: PillarStyles;
    bodyElements: Block[];
}

const ArticleBody = ({ bodyElements, pillarStyles }: ArticleBodyProps): Reader<Env, JSX.Element> =>
    render(bodyElements).map(rendered =>
        <article css={[ArticleBodyStyles(pillarStyles), ArticleBodyDarkStyles(pillarStyles)]}>
            { rendered.html }
        </article>
    );
    

export default ArticleBody;
