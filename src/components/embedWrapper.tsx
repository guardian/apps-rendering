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
						return { source };
					})(embed.source),
				),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((sourceDomain) => {
						return { sourceDomain };
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
						return { sourceDomain };
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
						return { source };
					})(embed.source),
				),
				...withDefault<Record<string, string>>({})(
					map<string, Record<string, string>>((sourceDomain) => {
						return { sourceDomain };
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
		container: Record<string, string>,
		parameterName: string,
	): Result<string, string> => {
		return resultFromNullable(
			`I can't find a '${parameterName}' field for this embed`,
		)(container[parameterName]);
	};

	const requiredNumberParam = (
		container: Record<string, string>,
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

	const parseDataAttributesFromElement = (
		container: Element,
	): Record<string, string> => {
		return container
			.getAttributeNames()
			.filter((currentKey) => currentKey.startsWith('data-'))
			.reduce((acc, currentKey) => {
				const newKey = currentKey
					.replace(/^data-/g, '')
					.replace(/-./g, (x) => x.toUpperCase()[1]);
				const currentValue = container.getAttribute(currentKey);
				return { ...acc, [newKey]: currentValue };
			}, {});
	};

	const elementProps = parseDataAttributesFromElement(container);

	switch (elementProps['kind'] as EmbedKind) {
		case EmbedKind.Spotify:
			return resultMap3(
				(src: string, width: number, height: number): Spotify => ({
					kind: EmbedKind.Spotify,
					src,
					width,
					height,
					source: fromNullable(elementProps['source']),
					sourceDomain: fromNullable(elementProps['sourceDomain']),
					tracking: parseTrackingParam(elementProps['tracking']),
				}),
			)(requiredStringParam(elementProps, 'src'))(
				requiredNumberParam(elementProps, 'width'),
			)(requiredNumberParam(elementProps, 'height'));
		case EmbedKind.YouTube:
			return resultMap3(
				(id: string, width: number, height: number): YouTube => ({
					kind: EmbedKind.YouTube,
					id,
					width,
					height,
					source: fromNullable(elementProps['source']),
					sourceDomain: fromNullable(elementProps['sourceDomain']),
					tracking: parseTrackingParam(elementProps['tracking']),
				}),
			)(requiredStringParam(elementProps, 'id'))(
				requiredNumberParam(elementProps, 'width'),
			)(requiredNumberParam(elementProps, 'height'));
		case EmbedKind.Generic: {
			return resultMap2<string, number, Generic>(
				(html: string, height: number): Generic => ({
					kind: EmbedKind.Generic,
					alt: fromNullable(elementProps['alt']),
					html,
					height,
					mandatory: elementProps['mandatory'] === 'true',
					source: fromNullable(elementProps['source']),
					sourceDomain: fromNullable(elementProps['sourceDomain']),
					tracking: parseTrackingParam(elementProps['tracking']),
				}),
			)(requiredStringParam(elementProps, 'html'))(
				requiredNumberParam(elementProps, 'height'),
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
		)(h(EmbedComponentInClickToView, { embed }));
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

const withDatasetKeyFormat = (
	dataSet: Record<string, string>,
): Record<string, string> => {
	return Object.keys(dataSet).reduce((accumulatedObject, currentKey) => {
		const newKey =
			'data-' +
			currentKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		return { ...accumulatedObject, [newKey]: dataSet[currentKey] };
	}, {});
};

const EmbedComponentWrapper: FC<Props> = ({ embed }: Props) => {
	if (
		embed.tracking === EmbedTracksType.TRACKS ||
		embed.tracking === EmbedTracksType.UNKNOWN
	) {
		return h(
			'div',
			{
				...withDatasetKeyFormat(embedToDivProps(embed)),
				className: 'click-to-view-container',
			},
			EmbedComponentInClickToView({ embed }),
		);
	} else {
		return h(EmbedComponent, { embed });
	}
};

// ----- Exports ----- //
export {
	EmbedComponentWrapper,
	createEmbedComponentFromProps,
	EmbedComponentInClickToView,
};
