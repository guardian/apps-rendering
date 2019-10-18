import React from 'react';
import { PillarStyles, bulletStyles, commonArticleStyles } from '../../styles';
import LiveblogBlock from './LiveblogBlock';
import LiveblogLoadMore from './LiveblogLoadMore';
import { render } from 'renderBlocks';
import { Block } from 'types/capi-thrift-models';

import { css, SerializedStyles } from '@emotion/core'
import { Reader } from 'types/Reader';
import { Env } from 'server';

const LiveBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        width: calc(100% - 16px);
        margin: 1em 0;
    }

    ${commonArticleStyles(pillarStyles)}
    ${bulletStyles(pillarStyles.kicker)}

    .image, figcaption {
        padding: 0;
    }
`;

interface LiveblogBodyProps {
    pillarStyles: PillarStyles;
    bodyElements: Block[];
}

function LiveblogBody({ pillarStyles, bodyElements }: LiveblogBodyProps): Reader<Env, JSX.Element> {
    const initialBlocks = bodyElements.slice(0, 7);
    const LoadMore = ({ total }: { total: number }): JSX.Element | null => total > 10
        ? <LiveblogLoadMore pillarStyles={pillarStyles}/> 
        : null;

    return (
        Reader.asks(env =>
            <article css={LiveBodyStyles(pillarStyles)}>
                { initialBlocks.map((block: Block) =>
                    <LiveblogBlock
                        key={block.id}
                        pillarStyles={pillarStyles} 
                        highlighted={!!block.attributes.keyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublishedDate}
                        lastModifiedDate={block.lastModifiedDate}
                    >
                        <>{render(block.elements).run(env).html}</>
                    </LiveblogBlock>
                ) }
                <LoadMore total={bodyElements.length}/>
            </article>
    ))
}

export default LiveblogBody;
