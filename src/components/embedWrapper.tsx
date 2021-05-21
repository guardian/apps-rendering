// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import type { Option, Result } from '@guardian/types';
import {
	err,
	fromNullable,
	map,
	none,
	ok,
	resultAndThen,
	resultMap,
	some,
	withDefault,
} from '@guardian/types';
import { ClickToView } from 'components/ClickToView';
import EmbedComponent from 'components/embed';
import { EmbedKind } from 'embed';
import type {
	EmailSignup,
	Embed,
	Generic,
	GenericFields,
	Instagram,
	Spotify,
	TikTok,
	YouTube,
} from 'embed';
import { pipe, resultFromNullable, resultMap2, resultMap3 } from 'lib';
import { createElement as h } from 'react';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	embed: Embed;
	editions: boolean;
}

const genericDivProps = (
	embed: Generic | TikTok | EmailSignup,
): Record<string, string> => ({
	...withDefault({})(
		map<string, Record<string, string>>((alt) => {
			return { alt };
		})(embed.alt),
	),
	html: embed.html,
	height: embed.height.toString(),
	...(embed.mandatory && { mandatory: 'true' }),
	...pipe(
		embed.source,
		map((source) => ({ source })),
		withDefault<Record<string, string>>({}),
	),
	...pipe(
		embed.sourceDomain,
		map((sourceDomain) => ({ sourceDomain })),
		withDefault<Record<string, string>>({}),
	),
	...(embed.tracking && { tracking: embed.tracking.toString() }),
});

const embedToDivProps = (embed: Embed): Record<string, string> => {
	switch (embed.kind) {
		case EmbedKind.Spotify:
			return {
				kind: EmbedKind.Spotify,
				src: embed.src,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.YouTube:
			return {
				kind: EmbedKind.YouTube,
				id: embed.id,
				width: embed.width.toString(),
				height: embed.height.toString(),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		case EmbedKind.Generic: {
			return {
				kind: EmbedKind.Generic,
				...genericDivProps(embed),
			};
		}
		case EmbedKind.EmailSignup: {
			return {
				kind: EmbedKind.EmailSignup,
				...genericDivProps(embed),
			};
		}
		case EmbedKind.TikTok: {
			return {
				kind: EmbedKind.TikTok,
				...genericDivProps(embed),
			};
		}
		case EmbedKind.Instagram: {
			return {
				kind: EmbedKind.Instagram,
				id: embed.id,
				...pipe(
					embed.caption,
					map((caption) => ({ caption: caption })),
					withDefault<Record<string, string>>({}),
				),
				...(embed.tracking && { tracking: embed.tracking.toString() }),
			};
		}
	}
};

const divElementPropsToEmbedComponentProps = (
	container: Element,
): Result<string, EmbedComponentInClickToViewProps> => {
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

	const requiredBooleanParam = (
		container: Record<string, string | undefined>,
		parameterName: string,
	): Result<string, boolean> => {
		return pipe(
			requiredStringParam(container, parameterName),
			resultAndThen((value: string) => {
				if (value === 'true') {
					return ok(true);
				}
				if (value === 'false') {
					return ok(false);
				}

				return err(`${value} is not a valid boolean value`);
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

	type ElementProps = Record<string, string | undefined>;

	const parseGenericFields = (
		elementProps: ElementProps,
	): Result<string, GenericFields> =>
		resultMap2(
			(html: string, height: number): GenericFields => ({
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
									tracking: parseTrackingParam(
										elementProps['tracking'],
									),
								}),
							)(requiredStringParam(elementProps, 'id'))(
								requiredNumberParam(elementProps, 'width'),
							)(requiredNumberParam(elementProps, 'height'));
						case EmbedKind.Instagram: {
							return resultMap<string, Instagram>(
								(id: string): Instagram => ({
									kind: EmbedKind.Instagram,
									id,
									caption: fromNullable(
										elementProps['caption'],
									),
									tracking: parseTrackingParam(
										elementProps['tracking'],
									),
								}),
							)(requiredStringParam(elementProps, 'id'));
						}
						case EmbedKind.Generic: {
							return pipe(
								elementProps,
								parseGenericFields,
								resultMap(
									(
										genericFields: GenericFields,
									): Generic => ({
										kind: EmbedKind.Generic,
										...genericFields,
									}),
								),
							);
						}
						case EmbedKind.TikTok: {
							return pipe(
								elementProps,
								parseGenericFields,
								resultMap(
									(genericFields: GenericFields): TikTok => ({
										kind: EmbedKind.TikTok,
										...genericFields,
									}),
								),
							);
						}
						case EmbedKind.EmailSignup: {
							return pipe(
								elementProps,
								parseGenericFields,
								resultMap(
									(
										genericFields: GenericFields,
									): EmailSignup => ({
										kind: EmbedKind.EmailSignup,
										...genericFields,
									}),
								),
							);
						}
					}
				},
			),
		);
	};

	return pipe(
		getDataAttributesFromElement(container),
		resultAndThen((dataAttributes) => {
			return resultMap2((editions: boolean, embed: Embed) => {
				const sourceDetails = getSourceDetailsForEmbed(embed);
				return { editions, embed, sourceDetails };
			})(requiredBooleanParam(dataAttributes, 'editions'))(
				dataAttributesToEmbed(dataAttributes),
			);
		}),
	);
};

const createEmbedComponentFromProps = (
	container: Element,
): Result<string, ReactElement> => {
	return resultAndThen(
		(embedComponentProps: EmbedComponentInClickToViewProps) => {
			return resultFromNullable(
				`I can't construct a Component for embed of type ${embedComponentProps.embed.kind}`,
			)(h(EmbedComponentInClickToView, embedComponentProps));
		},
	)(divElementPropsToEmbedComponentProps(container));
};

type SourceDetails = { source: Option<string>; sourceDomain: Option<string> };

const getSourceDetailsForEmbed = (embed: Embed): SourceDetails => {
	switch (embed.kind) {
		case EmbedKind.YouTube:
			return {
				source: some('YouTube'),
				sourceDomain: some('www.youtube.com'),
			};
		case EmbedKind.Instagram:
			return {
				source: some('Instagram'),
				sourceDomain: some('www.instagram.com'),
			};
		case EmbedKind.Spotify:
			return {
				source: some('Spotify'),
				sourceDomain: some('www.spotify.com'),
			};
		case EmbedKind.Generic:
		case EmbedKind.TikTok:
		case EmbedKind.EmailSignup:
			return {
				source: embed.source,
				sourceDomain: embed.sourceDomain,
			};
	}
};

const isblockedEditionsEmbed = (embed: Embed): boolean =>
	embed.kind === EmbedKind.TikTok || embed.kind === EmbedKind.Instagram;

const renderOverlay = (embed: Embed, editions: boolean): boolean => {
	if (!editions) {
		return true;
	}
	if (isblockedEditionsEmbed(embed)) {
		return false;
	}
	return true;
};

interface EmbedComponentInClickToViewProps {
	embed: Embed;
	editions: boolean;
	sourceDetails: SourceDetails;
}

const EmbedComponentInClickToView: FC<EmbedComponentInClickToViewProps> = ({
	embed,
	editions,
	sourceDetails,
}) => {
	return renderOverlay(embed, editions)
		? h(ClickToView, {
				source: sourceDetails.source,
				sourceDomain: sourceDetails.sourceDomain,
				children: h(EmbedComponent, { embed, editions }),
				role: none,
				onAccept: none,
		  })
		: null;
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

const EmbedComponentWrapper: FC<Props> = ({ embed, editions }: Props) => {
	if (
		embed.tracking === EmbedTracksType.TRACKS ||
		embed.tracking === EmbedTracksType.UNKNOWN
	) {
		const sourceDetails = getSourceDetailsForEmbed(embed);
		return h(
			'div',
			{
				...withDatasetKeyFormat(embedToDivProps(embed)),
				...withDatasetKeyFormat({
					editions: editions ? 'true' : 'false',
				}),
				className: 'js-click-to-view-container',
			},
			EmbedComponentInClickToView({ embed, editions, sourceDetails }),
		);
	} else {
		return h(EmbedComponent, { embed, editions });
	}
};

// ----- Exports ----- //
export {
	EmbedComponentWrapper,
	createEmbedComponentFromProps,
	EmbedComponentInClickToView,
	SourceDetails,
};
