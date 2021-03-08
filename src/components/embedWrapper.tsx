// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import type { Result } from '@guardian/types';
import {
	err,
	fromNullable,
	map,
	none,
	ok,
	resultAndThen,
	withDefault,
} from '@guardian/types';
import { ClickToView } from 'components/ClickToView';
import EmbedComponent from 'components/embed';
import { EmbedKind } from 'embed';
import type { Embed, Generic, Spotify, YouTube } from 'embed';
import { pipe, pipe2, resultFromNullable, resultMap2, resultMap3 } from 'lib';
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
				...pipe2(
					embed.source,
					map((source) => ({ source })),
					withDefault<Record<string, string>>({}),
				),
				...pipe2(
					embed.sourceDomain,
					map((sourceDomain) => ({ sourceDomain })),
					withDefault<Record<string, string>>({}),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.YouTube:
			return {
				kind: EmbedKind.YouTube,
				id: embed.id,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...pipe2(
					embed.source,
					map((source) => ({ source })),
					withDefault<Record<string, string>>({}),
				),
				...pipe2(
					embed.sourceDomain,
					map((sourceDomain) => ({ sourceDomain })),
					withDefault<Record<string, string>>({}),
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
				...pipe2(
					embed.source,
					map((source) => ({ source })),
					withDefault<Record<string, string>>({}),
				),
				...pipe2(
					embed.sourceDomain,
					map((sourceDomain) => ({ sourceDomain })),
					withDefault<Record<string, string>>({}),
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
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, string> => {
		return resultFromNullable(
			`I can't find a '${parameterName}' field for this embed`,
		)(container[parameterName]);
	};

	const requiredNumberParam = (
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, number> => {
		return pipe(
			requiredStringParam(container, parameterName),
			resultAndThen((value: string) => {
				const parsedValue = Number.parseInt(value);

				if (Number.isNaN(parsedValue)) {
					return err(`${value} is not a integer`);
				}

				return ok(parsedValue);
			}),
		);
	};

	const getDataAttributesFromElement = (
		container: Element,
	): Result<string, Record<string, string | undefined>> => {
		if (container instanceof HTMLElement) {
			return ok({ ...container.dataset });
		} else {
			return err('Embed wrapper Element does not have a dataset field');
		}
	};

	const parseEmbedKind = (
		kindValue: string | undefined,
	): Result<string, EmbedKind> => {
		if (kindValue && kindValue in EmbedKind) {
			return ok(kindValue as EmbedKind);
		}

		return err(`'${kindValue ?? 'undefined'}' is not an EmbedKind`);
	};

	const dataAttributesToEmbed = (
		elementProps: Record<string, string | undefined>,
	): Result<string, Embed> => {
		return pipe(
			parseEmbedKind(elementProps['kind']),
			resultAndThen(
				(embedKind: EmbedKind): Result<string, Embed> => {
					switch (embedKind) {
						case EmbedKind.Spotify:
							return resultMap3(
								(
									src: string,
									width: number,
									height: number,
								): Spotify => ({
									kind: EmbedKind.Spotify,
									src,
									width,
									height,
									source: fromNullable(
										elementProps['source'],
									),
									sourceDomain: fromNullable(
										elementProps['sourceDomain'],
									),
									tracking: parseTrackingParam(
										elementProps['tracking'],
									),
								}),
							)(requiredStringParam(elementProps, 'src'))(
								requiredNumberParam(elementProps, 'width'),
							)(requiredNumberParam(elementProps, 'height'));
						case EmbedKind.YouTube:
							return resultMap3(
								(
									id: string,
									width: number,
									height: number,
								): YouTube => ({
									kind: EmbedKind.YouTube,
									id,
									width,
									height,
									source: fromNullable(
										elementProps['source'],
									),
									sourceDomain: fromNullable(
										elementProps['sourceDomain'],
									),
									tracking: parseTrackingParam(
										elementProps['tracking'],
									),
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
									mandatory:
										elementProps['mandatory'] === 'true',
									source: fromNullable(
										elementProps['source'],
									),
									sourceDomain: fromNullable(
										elementProps['sourceDomain'],
									),
									tracking: parseTrackingParam(
										elementProps['tracking'],
									),
								}),
							)(requiredStringParam(elementProps, 'html'))(
								requiredNumberParam(elementProps, 'height'),
							);
						}
					}
				},
			),
		);
	};

	return pipe(
		getDataAttributesFromElement(container),
		resultAndThen(dataAttributesToEmbed),
	);
};

const createEmbedComponentFromProps = (
	container: Element,
): Result<string, ReactElement> => {
	return resultAndThen((embed: Embed) => {
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

/**
 * This converts the key values of an object into keys appropriate to be
 * used as the dataset of an element.
 *
 * The converted fields can be added as attributes to an element and
 * can then be read in their pre-converted form using the element.dataset
 * attribute.
 *
 * For more details see: https://docs.w3cub.com/dom/htmlelement/dataset
 */
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
				className: 'js-click-to-view-container',
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
