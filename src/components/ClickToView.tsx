import { Button } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { background, border } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgCheckmark } from '@guardian/src-icons';
import { css } from 'emotion';
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
	role?: RoleType;
	onAccept?: () => void;
	source?: string;
	sourceDomain?: string;
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
	role = 'inline',
	onAccept,
	source,
	sourceDomain = 'unknown',
}: ClickToViewProps): JSX.Element => {
	const [isOverlayClicked, setIsOverlayClicked] = useState<boolean>(false);

	const handleClick = (): void => {
		setIsOverlayClicked(true);
		if (onAccept) {
			setTimeout(() => onAccept());
		}
	};

	const textSize = roleTextSize(role);

	if (!isOverlayClicked) {
		return (
			<div
				className={css`
					width: 100%;
					background: ${background.secondary};
					border: 1px solid ${border.primary};
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: ${space[3]}px;
					margin-bottom: 8px;
				`}
			>
				<div
					className={css`
						${roleHeadlineSize(role)}
						margin-bottom: 8px;
					`}
				>
					{source
						? `Allow ${source} content?`
						: 'Allow content provided by a third party?'}
				</div>
				<div
					className={css`
						${textSize}
						a {
							${textSize}
						}
						p {
							margin-bottom: 8px;
						}
					`}
				>
					{source ? (
						<>
							<p>
								This article includes content provided by{' '}
								{source}. We ask for your permission before
								anything is loaded, as they may be using cookies
								and other technologies.
							</p>
							<p>
								To view this content, click &apos;Allow and
								continue&apos;.
							</p>
						</>
					) : (
						<>
							<p>
								This article includes content hosted on{' '}
								{sourceDomain}. We ask for your permission
								before anything is loaded, as the provider may
								be using cookies and other technologies.
							</p>
							<p>
								To view this content, click &apos;Allow and
								continue&apos;.
							</p>
						</>
					)}
				</div>
				<div>
					<Button
						priority="primary"
						size={roleButtonSize(role)}
						icon={<SvgCheckmark />}
						iconSide="left"
						onClick={handleClick}
					>
						{roleButtonText(role)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};
