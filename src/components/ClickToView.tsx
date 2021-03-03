import { Button } from '@guardian/src-button';
import { remSpace } from '@guardian/src-foundations';
import { background, border } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgCheckmark } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { OptionKind, Role, withDefault } from '@guardian/types';
import { css } from 'emotion';
import { fold } from 'lib';
import React, { useState } from 'react';

export type ClickToViewProps = {
	children: React.ReactNode;
	role: Option<Role>;
	onAccept: Option<() => void>;
	source: Option<string>;
	sourceDomain: Option<string>;
};

const roleTextSize = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return textSans.medium();
		}
		case Role.HalfWidth:
		case Role.Supporting:
		case Role.Thumbnail: {
			return textSans.small();
		}
	}
};

const roleHeadlineSize = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return headline.xsmall();
		}
		case Role.HalfWidth:
		case Role.Supporting:
		case Role.Thumbnail: {
			return headline.xxsmall();
		}
	}
};

const roleButtonSize = (role: Role): 'default' | 'small' | 'xsmall' => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return 'small';
		}
		case Role.HalfWidth:
		case Role.Supporting:
		case Role.Thumbnail: {
			return 'xsmall';
		}
	}
};

const roleButtonText = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase:
		case Role.HalfWidth:
		case Role.Supporting: {
			return 'Allow and continue';
		}
		case Role.Thumbnail: {
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

	const roleWithDefault = withDefault(Role.Inline)(role);

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
