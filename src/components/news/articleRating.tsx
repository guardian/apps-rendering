import React from 'react';
import { sidePadding, icons } from '../../styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const ArticleRatingStyles = css`    
    ${sidePadding}
    ${icons}

    font-size: 2rem;
    line-height: 2rem;
    padding-top: calc(8px + .4rem);

    span {
        background-color: ${palette.yellow.main};
        color: ${palette.neutral[7]};
        padding: 0 .2rem .4rem;
        font-size: inherit;

        &:nth-of-type(1) {
            padding-left: .5rem;
        }

        &:nth-of-type(5) {
            padding-right: .5rem;
        }
    }

    span.filled::before {
        content: '\\2605';
    }

    span::before {
        content: '\\2606';
    }
`;

interface ArticleRatingProps {
   rating: string;
}

const ArticleSeries = ({ rating }: ArticleRatingProps): JSX.Element | null => {
    const numericalRating = parseInt(rating);
    const acceptedRatings = [0, 1, 2, 3, 4, 5];
    if (!acceptedRatings.includes(numericalRating)) return null;

    return (
        <div css={ArticleRatingStyles}>
            {
                [...Array(5)].map((_star, index) => {
                    return index + 1 <= numericalRating
                        ? <span key={index} className="filled"></span>
                        : <span key={index}></span>
                })
            }
        </div>
    )
}

export default ArticleSeries;
