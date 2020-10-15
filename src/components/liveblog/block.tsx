import React, { ReactNode, useState, useEffect, FC } from 'react';
import { basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { makeRelativeDate, formatDate } from 'date';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { Option, withDefault, map } from '@guardian/types/option';
import { remSpace } from '@guardian/src-foundations';
import { pipe2 } from 'lib';

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${neutral[100]};
    border-top: solid 1px ${highlighted ? kicker : neutral[86]};
    border-bottom: solid 2px ${neutral[93]};
    margin-top: 12px;
    margin-bottom: 12px;

    time {
        color: ${neutral[46]};
        ${textSans.small()}
        display: inline-block;
        margin: 0;
    }

    time {
        margin-top: ${remSpace[4]};
    }

    time:nth-child(1) {
        margin-top: 0;
        margin-bottom: ${remSpace[4]};
    }

    ${until.phablet} {
        margin-left: ${basePx(1)};
        margin-right: ${basePx(1)};
    }

    h3 {
        margin-top: .2rem;
    }
`;

interface LiveblogBlockProps {
    pillar: Pillar;
    highlighted: boolean;
    firstPublishedDate: Option<Date>;
    lastModifiedDate: Option<Date>;
    title: string;
    children: ReactNode;
}

interface TitleProps {
    title: string;
    highlighted: boolean;
}

const Title: FC<TitleProps> = ({ title, highlighted }) => {
    const TitleStyles = css`
        padding: 0.1rem 0.125rem;
        background-color: ${brandAlt[400]};
    `
    return title ? <h3><span css={highlighted ? TitleStyles : null}>{title}</span></h3> : null;
}

const LiveblogBlock: FC<LiveblogBlockProps> = ({
    pillar,
    highlighted,
    title,
    children,
    firstPublishedDate,
    lastModifiedDate,
}) => {
    const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
        date,
        map(date => <time>{makeRelativeDate(date)}</time>),
        withDefault<JSX.Element | null>(null),
    );

    const relativeLastModified: JSX.Element | null = pipe2(
        lastModifiedDate,
        map(date => <time>Last updated: {formatDate(date)}</time>),
        withDefault<JSX.Element | null>(null),
    );

    const [dateJsx, setDateJsx] = useState(relativeFirstPublished(firstPublishedDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setDateJsx(relativeFirstPublished(firstPublishedDate));
        }, 15000);

        return (): void => clearInterval(interval);
      }, []);

    return (
        <article>
            <LeftColumn
                columnContent={dateJsx}
                className={LiveblogBlockStyles(getPillarStyles(pillar), highlighted)}
            >
                <Title highlighted={highlighted} title={title} />
                {children}
                {relativeLastModified}
            </LeftColumn>
        </article>
    )
}

export default LiveblogBlock;