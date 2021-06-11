// ----- Imports ----- //

import type { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { err, none, OptionKind, resultAndThen, ResultKind, some } from '@guardian/types';
import type { Option, Result } from '@guardian/types';
import { padZero } from 'date';
import fetch from 'node-fetch';
import type { Response } from 'node-fetch';
import type { Parser } from 'parser';
import { arrayParser, fieldParser, map, map3, map6, map7, maybe, numberParser, parse, stringParser } from 'parser';
import { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import { optionToUndefined, pipe } from 'lib';
import { Scorer } from '@guardian/apps-rendering-api-models/scorer';

// ----- Types ----- //

type Teams = [string, string];

const makeFootballContent = (
	id: string,
	status: string,
	kickOff: string,
	competitionDisplayName: string,
	homeTeam: FootballTeam,
	awayTeam: FootballTeam,
	venue: string | undefined
): FootballContent => ({
	id,
	status,
	kickOff,
	competitionDisplayName,
	homeTeam,
	awayTeam,
	venue,
});

const makeFootballTeam = (
	id: string,
    name: string,
    shortCode: string,
    crestUri: string,
    score: number,
    scorers: Scorer[],
): FootballTeam => ({
	id,
    name,
    shortCode,
    crestUri,
    score,
    scorers,
});

const makeScorer = (
	player: string,
	timeInMinutes: number,
	additionalInfo: string | undefined,
): Scorer => ({
	player,
	timeInMinutes,
	additionalInfo,
});

// ----- Parsers ----- //

const stringOrUndefinedParser: Parser<string | undefined> =
	pipe(stringParser, maybe, map(optionToUndefined));

const scorerParser: Parser<Scorer> =
	map3(makeScorer)(
		fieldParser('player', stringParser),
		fieldParser('timeInMinutes', numberParser),
		fieldParser('additionalInfo', stringOrUndefinedParser)
	);

const footballTeamParser: Parser<FootballTeam> =
	map6(makeFootballTeam)(
		fieldParser('id', stringParser),
		fieldParser('name', stringParser),
		fieldParser('shortCode', stringParser),
		fieldParser('crestUri', stringParser),
		fieldParser('score', numberParser),
		fieldParser('scorers', arrayParser(scorerParser)),
	);

const footballContentParser: Parser<FootballContent> =
	map7(makeFootballContent)(
		fieldParser('id', stringParser),
		fieldParser('status', stringParser),
		fieldParser('kickOff', stringParser),
		fieldParser('competitionDisplayName', stringParser),
		fieldParser('homeTeam', footballTeamParser),
		fieldParser('awayTeam', footballTeamParser),
		fieldParser('venue', stringOrUndefinedParser),
	);

const footballContentParserFor = (selectorId: string): Parser<FootballContent> =>
	fieldParser(selectorId, footballContentParser);

const footballErrorParser: Parser<string> =
	fieldParser('errorMessage', stringParser);

// ----- Functions ----- //

const getFootballSelector = (
	date: Option<Date>,
	teamA: Option<string>,
	teamB: Option<string>,
): Option<string> => {
	if (
		date.kind === OptionKind.Some &&
		teamA.kind === OptionKind.Some &&
		teamB.kind === OptionKind.Some
	) {
		// MAPI sorts these by string value
		const teams =
			teamA.value < teamB.value
				? [teamA.value, teamB.value]
				: [teamB.value, teamA.value];

		const d = date.value;
		const year = d.getUTCFullYear();
		const month = padZero(d.getUTCMonth() + 1);
		const day = padZero(d.getUTCDate());

		return some(`${year}-${month}-${day}_${teams[0]}_${teams[1]}`);
	}

	return none;
};

const getFootballEndpoint = (selectorId: Option<string>): Option<string> => {
	if (selectorId.kind === OptionKind.Some) {
		return some(
			`https://mobile.guardianapis.com/sport/football/matches?selector=${selectorId.value}`,
		);
	}
	return none;
};

const parseFootballResponse = async (
	response: Response,
	selectorId: string,
): Promise<Result<string, FootballContent>> => {
	switch(response.status) {
		case 200:
			return pipe(
				await response.json(),
				parse(footballContentParserFor(selectorId)),
			);

		case 400:
			return pipe(
				await response.json(),
				parse(footballErrorParser),
				resultAndThen<string, string, FootballContent>(err),
			);

		default:
			return err('Problem accessing PA API');
	}
};

const teamsFromTags = (tags: Tag[]): Option<Teams> => {
	const [teamA, teamB] = tags.reduce((ids: string[], tag: Tag) => {
		const teamTag = tag.references.find((ref) =>
			ref.id.startsWith('pa-football-team'),
		);

		if (teamTag !== undefined) {
			const id = teamTag.id.split('/')[1];

			return [...ids, id];
		}

		return ids;
	}, []);

	if (teamA && teamB) {
		return some([teamA, teamB]);
	}

	return none;
};

const getFootballContent = async (
	content: Content,
): Promise<FootballContent | undefined> => {
	const teams = teamsFromTags(content.tags);

	if (teams.kind === OptionKind.Some) {
		const currentTeams = teams.value;
		const teamA = some(currentTeams[0]);
		const teamB = some(currentTeams[1]);

		const webPublicationDate = content.webPublicationDate?.iso8601;

		if (webPublicationDate) {
			const date = some(new Date(webPublicationDate));

			const selectorId = getFootballSelector(date, teamA, teamB);

			if (selectorId.kind === OptionKind.Some) {
				const footballEndpoint = getFootballEndpoint(selectorId);

				if (footballEndpoint.kind === OptionKind.Some) {
					const response = await fetch(footballEndpoint.value);

					const footballContent = await parseFootballResponse(
						response,
						selectorId.value,
					);

					if (footballContent.kind === ResultKind.Ok) {
						return footballContent.value;
					}
					return undefined;
				}
				return undefined;
			}
			return undefined;
		}
		return undefined;
	}
	return undefined;
};

// ----- Exports ----- //

export { getFootballContent };
