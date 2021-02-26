// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import type { Result } from '@guardian/types';
import { err, fromNullable, map, none, ok, withDefault } from '@guardian/types';
import { andThen } from '@guardian/types/dist/result';
import { ClickToView } from 'components/ClickToView';
import EmbedComponent from 'components/embed';
import { EmbedKind } from 'embed';
import type { Embed, Generic, Spotify, YouTube } from 'embed';
import { resultFromNullable, resultMap2, resultMap3 } from 'lib';
import { createElement as h } from 'react';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	embed: Embed;
}

const embedToDivProps = (embed: Embed): Record<string, string> => {
	switch (embed.kind) {
		case EmbedKind.Spotify:
			return {
				kind: EmbedKind.Spotify,
				src: embed.src,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((source) => {
						return { source: source };
					})(embed.source),
				),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((sourceDomain) => {
						return { 'source-domain': sourceDomain };
					})(embed.sourceDomain),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.YouTube:
			return {
				kind: EmbedKind.YouTube,
				id: embed.id,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((source) => {
						return { source: source };
					})(embed.source),
				),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((sourceDomain) => {
						return { 'source-domain': sourceDomain };
					})(embed.sourceDomain),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.Generic: {
			return {
				kind: EmbedKind.Generic,
				...withDefault({})(
					map<string, Record<string, string>>((alt) => {
						return { alt };
					})(embed.alt),
				),
				html: embed.html,
				height: embed.height.toString(),
				...(embed.mandatory && { mandatory: 'true' }),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((source) => {
						return { source: source };
					})(embed.source),
				),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((sourceDomain) => {
						return { 'source-domain': sourceDomain };
					})(embed.sourceDomain),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		}
	}
};

const divElementPropsToEmbed = (container: Element): Result<string, Embed> => {
	const parseTrackingParam = (param?: string): EmbedTracksType => {
		switch (param) {
			case '0':
				return EmbedTracksType.UNKNOWN;
			case '1':
				return EmbedTracksType.TRACKS;
			case '2':
				return EmbedTracksType.DOES_NOT_TRACK;
			default:
				return EmbedTracksType.DOES_NOT_TRACK;
		}
	};

	const requiredStringParam = (
		container: Element,
		parameterName: string,
	): Result<string, string> => {
		return resultFromNullable(
			`I can't find a '${parameterName}' field for this embed`,
		)(container.getAttribute(parameterName));
	};

	const requiredNumberParam = (
		container: Element,
		parameterName: string,
	): Result<string, number> => {
		return andThen((value: string) => {
			const parsedValue = Number.parseInt(value);

			if (Number.isNaN(parsedValue)) {
				return err(`${value} is not a integer`);
			}

			return ok(parsedValue);
		})(requiredStringParam(container, parameterName));
	};

	switch (container.getAttribute('kind') as EmbedKind) {
		case EmbedKind.Spotify:
			return resultMap3(
				(src: string, width: number, height: number): Spotify => ({
					kind: EmbedKind.Spotify,
					src,
					width,
					height,
					source: fromNullable(container.getAttribute('source')),
					sourceDomain: fromNullable(
						container.getAttribute('source-domain'),
					),
					tracking: parseTrackingParam(
						container.getAttribute('tracking') ?? undefined,
					),
				}),
			)(requiredStringParam(container, 'src'))(
				requiredNumberParam(container, 'width'),
			)(requiredNumberParam(container, 'height'));
		case EmbedKind.YouTube:
			return resultMap3(
				(id: string, width: number, height: number): YouTube => ({
					kind: EmbedKind.YouTube,
					id,
					width,
					height,
					source: fromNullable(container.getAttribute('source')),
					sourceDomain: fromNullable(
						container.getAttribute('source-domain'),
					),
					tracking: parseTrackingParam(
						container.getAttribute('tracking') ?? undefined,
					),
				}),
			)(requiredStringParam(container, 'id'))(
				requiredNumberParam(container, 'width'),
			)(requiredNumberParam(container, 'height'));
		case EmbedKind.Generic: {
			return resultMap2<string, number, Generic>(
				(html: string, height: number): Generic => ({
					kind: EmbedKind.Generic,
					alt: fromNullable(container.getAttribute('alt')),
					html,
					height,
					mandatory: container.getAttribute('mandatory') === 'true',
					source: fromNullable(container.getAttribute('source')),
					sourceDomain: fromNullable(
						container.getAttribute('source-domain'),
					),
					tracking: parseTrackingParam(
						container.getAttribute('tracking') ?? undefined,
					),
				}),
			)(requiredStringParam(container, 'html'))(
				requiredNumberParam(container, 'height'),
			);
		}
	}
};

const createEmbedComponentFromProps = (
	container: Element,
): Result<string, ReactElement> => {
	return andThen((embed: Embed) => {
		return resultFromNullable(
			`I can't construct a Component for embed of type ${embed.kind}`,
		)(EmbedComponentInClickToView({ embed }));
	})(divElementPropsToEmbed(container));
};

const EmbedComponentInClickToView: FC<Props> = ({ embed }: Props) => {
	return h(ClickToView, {
		source: embed.source,
		sourceDomain: embed.sourceDomain,
		children: h(EmbedComponent, { embed }),
		role: none,
		onAccept: none,
	});
};

const EmbedComponentWrapper: FC<Props> = ({ embed }: Props) => {
	if (
		embed.tracking === EmbedTracksType.TRACKS ||
		embed.tracking === EmbedTracksType.UNKNOWN
	) {
		return h(
			'div',
			{ ...embedToDivProps(embed), className: 'click-to-view-container' },
			EmbedComponentInClickToView({ embed }),
		);
	} else {
		return h(EmbedComponent, { embed });
	}
};

// ----- Exports ----- //
export { EmbedComponentWrapper, createEmbedComponentFromProps };
