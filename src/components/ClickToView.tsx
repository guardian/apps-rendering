import { Button } from '@guardian/src-button';
import { remSpace } from '@guardian/src-foundations';
import { background, border } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgCheckmark } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { OptionKind, withDefault } from '@guardian/types';
import { css } from 'emotion';
import { fold } from 'lib';
import React, { useState } from 'react';

type RoleType =
	| 'immersive'
	| 'supporting'
	| 'showcase'
	| 'inline'
	| 'thumbnail'
	| 'halfWidth';

export type ClickToViewProps = {
	children: React.ReactNode;
	role: Option<RoleType>;
	onAccept: Option<() => void>;
	source: Option<string>;
	sourceDomain: Option<string>;
};

const roleTextSize = (role: RoleType): string => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return textSans.medium();
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return textSans.small();
		}
	}
};

const roleHeadlineSize = (role: RoleType): string => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return headline.xsmall();
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return headline.xxsmall();
		}
	}
};

const roleButtonSize = (role: RoleType): 'default' | 'small' | 'xsmall' => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase': {
			return 'small';
		}
		case 'halfWidth':
		case 'supporting':
		case 'thumbnail': {
			return 'xsmall';
		}
	}
};

const roleButtonText = (role: RoleType): string => {
	switch (role) {
		case 'immersive':
		case 'inline':
		case 'showcase':
		case 'halfWidth':
		case 'supporting': {
			return 'Allow and continue';
		}
		case 'thumbnail': {
			return 'Allow';
		}
	}
};

export const ClickToView = ({
	children,
	role,
	onAccept,
	source,
	sourceDomain,
}: ClickToViewProps): JSX.Element => {
	const [isOverlayClicked, setIsOverlayClicked] = useState<boolean>(false);

	const handleClick = (): void => {
		setIsOverlayClicked(true);
		if (onAccept.kind === OptionKind.Some) {
			setTimeout(() => onAccept.value());
		}
	};

	const roleWithDefault = withDefault('inline' as RoleType)(role);

	const textSize = roleTextSize(roleWithDefault);

	if (!isOverlayClicked) {
		return (
			<div
				css={css`
					width: 100%;
					background: ${background.secondary};
					border: 1px solid ${border.primary};
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: ${remSpace[3]};
					margin-bottom: ${remSpace[2]};
				`}
			>
				<div
					css={css`
						${roleHeadlineSize(roleWithDefault)}
						margin-bottom: ${remSpace[2]};
					`}
				>
					{fold(
						(source: string) => `Allow ${source} content?`,
						'Allow content provided by a third party?',
					)(source)}
				</div>
				<div
					css={css`
						${textSize}
						p {
							margin-bottom: ${remSpace[2]};
						}
					`}
				>
					{fold(
						(source) => (
							<>
								<p>
									This article includes content provided by{' '}
									{source}. We ask for your permission before
									anything is loaded, as they may be using
									cookies and other technologies.
								</p>
								<p>
									To view this content, click &apos;Allow and
									continue&apos;.
								</p>
							</>
						),
						<>
							<p>
								This article includes content hosted on{' '}
								{withDefault('unknown')(sourceDomain)}. We ask
								for your permission before anything is loaded,
								as the provider may be using cookies and other
								technologies.
							</p>
							<p>
								To view this content, click &apos;Allow and
								continue&apos;.
							</p>
						</>,
					)(source)}
				</div>
				<div>
					<Button
						priority="primary"
						size={roleButtonSize(roleWithDefault)}
						icon={<SvgCheckmark />}
						iconSide="left"
						onClick={handleClick}
					>
						{roleButtonText(roleWithDefault)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};
