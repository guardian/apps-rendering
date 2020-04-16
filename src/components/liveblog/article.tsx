import React from 'react';

import LiveblogSeries from 'components/liveblog/series';
import LiveblogHeadline from 'components/liveblog/headline';
import LiveblogStandfirst from 'components/liveblog/standfirst';
import Metadata from 'components/liveblog/metadata';
import LiveblogKeyEvents from 'components/liveblog/keyEvents';
import LiveblogBody from 'components/liveblog/body';
import HeaderImage from 'components/headerImage';
import Tags from 'components/shared/tags';
import { darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Liveblog, getFormat } from 'item';
import { ImageMappings } from 'components/shared/page';
import LeftColumn from 'components/shared/leftColumn';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${neutral[97]};
`;

const BorderStyles = css`
    ${darkModeCss`background: ${background.inverse};`}

    ${from.wide} {
        width: 1200px;
        margin: 0 auto;
    }
`;

const headerImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${from.wide} {
        padding-bottom: 12px;
    }
`;

interface LiveblogArticleProps {
    item: Liveblog;
    imageMappings: ImageMappings;
}

const LiveblogArticle = ({ item, imageMappings }: LiveblogArticleProps): JSX.Element => {
    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={item.series} pillar={item.pillar} />
                <LiveblogHeadline headline={item.headline} pillar={item.pillar} />
                <LiveblogStandfirst standfirst={item.standfirst} pillar={item.pillar} />
                <Metadata item={item} imageMappings={imageMappings} />
                <LeftColumn className={headerImageStyles(getPillarStyles(item.pillar))}>
                    <HeaderImage
                        image={item.mainImage}
                        imageMappings={imageMappings}
                        format={getFormat(item)}
                    />
                </LeftColumn>
                <LiveblogKeyEvents blocks={item.blocks} pillar={item.pillar} />
                <LiveblogBody
                    blocks={item.blocks}
                    pillar={item.pillar}
                    imageMappings={imageMappings}
                    totalBodyBlocks={item.totalBodyBlocks}
                />
                <Tags tags={item.tags} background={neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
