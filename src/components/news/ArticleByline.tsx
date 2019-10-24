import React from 'react';
import { sidePadding, textSans, PillarStyles, darkModeCss } from '../../styles';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { formatDate } from 'utils/date';
import { Contributor } from 'types/Capi';
import Avatar from 'components/shared/Avatar';
import Follow from 'components/shared/Follow';
import { Reader } from 'types/Reader';
import { Env } from 'types/Env';

const ArticleBylineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    .author {
        address {
            line-height: 2.2rem;
            font-style: inherit;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        .date, .follow {
            ${textSans}
        }

        .date {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const ArticleBylineDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        .date {
            color: ${palette.neutral[60]};
        }
    }
`;

interface ArticleBylineProps {
    byline: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
}

const ArticleByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
}: ArticleBylineProps): Reader<Env, JSX.Element> =>
    Avatar({ contributors, bgColour: pillarStyles.inverted }).map(avatar =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <div css={[ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}>
            <div css={sidePadding}>
                { avatar }
                <div className="author">
                    <address dangerouslySetInnerHTML={{__html: byline}}></address>
                    <time className="date">{ formatDate(new Date(publicationDate)) }</time>
                    <Follow contributors={contributors} />
                </div>
            </div>
        </div>
    );
    

export default ArticleByline;
