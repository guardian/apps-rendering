// ----- Imports ----- //

import type { Option } from '@guardian/types';
import { map, none, some, withDefault } from '@guardian/types';
import { pipe } from 'lib';

// ----- Setup ----- //

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

// ----- Functions ----- //

function isToday(date: Date): boolean {
	const today = new Date();
	return date.toDateString() === today.toDateString();
}

function isWithin24Hours(date: Date): boolean {
	const today = new Date();
	return date.valueOf() > today.valueOf() - 24 * 60 * 60 * 1000;
}

function isWithinPastWeek(date: Date): boolean {
	const daysAgo = new Date().valueOf() - 7 * 24 * 60 * 60 * 1000;
	return date.valueOf() >= daysAgo;
}

function isWithinPastYear(date: Date): boolean {
	const weeksAgo = new Date().valueOf() - 52 * 7 * 24 * 60 * 60 * 1000;
	return date.valueOf() >= weeksAgo;
}

function isValidDate(date: Date): boolean {
	if (Object.prototype.toString.call(date) !== '[object Date]') {
		return false;
	}
	return !isNaN(date.getTime());
}

function makeRelativeDate(date: Date): string | null {
	const then: Date = new Date(date);
	const now: Date = new Date();

	if (!isValidDate(then)) {
		return null;
	}

	const delta: number = parseInt(
		`${(now.valueOf() - then.valueOf()) / 1000}`,
		10,
	);

	if (delta < 0) {
		return null;
	} else if (delta < 55) {
		return `${delta}s`;
	} else if (delta < 55 * 60) {
		const minutesAgo = Math.round(delta / 60);

		if (minutesAgo === 1) {
			return 'Now';
		} else {
			return `${minutesAgo}m ago`;
		}
	} else if (isToday(then) || isWithin24Hours(then)) {
		const hoursAgo = Math.round(delta / 3600);
		return `${hoursAgo}h ago`;
	} else if (isWithinPastWeek(then)) {
		const daysAgo = Math.round(delta / 3600 / 24);
		return `${daysAgo}d ago`;
	} else if (isWithinPastYear(then)) {
		const weeksAgo = Math.round(delta / 3600 / 24 / 7);
		return `${weeksAgo}w ago`;
	} else {
		const yearsAgo = Math.round(delta / 3600 / 24 / 7 / 52);
		return `${yearsAgo}y ago`;
	}
}

const day = (date: Date): string => days[date.getUTCDay()];

const month = (date: Date): string => months[date.getUTCMonth()];

const padZero = (n: number): string => (n < 10 ? `0${n}` : n.toString());

const time = (date: Date): string =>
	`${padZero(date.getUTCHours())}.${padZero(date.getUTCMinutes())}`;

const localTime = (date: Date): string =>
	`${padZero(date.getHours())}.${padZero(date.getMinutes())}`;

const localTimeZone = (date: Date): string =>
	/\(.*?\)$/.exec(date.toTimeString())?.pop() ?? '';

const format = (date: Date): string =>
	`${day(date)} ${date.getUTCDate()} ${month(
		date,
	)} ${date.getUTCFullYear()} ${time(date)} UTC`;

const formatLocal = (date: Date): string =>
	`${localDay(date)} ${date.getDate()} ${localMonth(
		date,
	)} ${date.getFullYear()} ${localTime(date)} ${localTimeZone(date)}`;

const localDay = (date: Date): string => days[date.getDay()];

const localMonth = (date: Date): string => months[date.getMonth()];

function fromString(date: string): Option<Date> {
	try {
		const maybeDate = new Date(date);
		if (!isValidDate(maybeDate)) {
			throw new Error('not a valid date');
		}
		return some(maybeDate);
	} catch (e) {
		return none;
	}
}

function formatSeconds(seconds: string): Option<string> {
	const secondsInt = parseInt(seconds);

	if (isNaN(secondsInt) || secondsInt < 0) {
		return none;
	}

	const hrs = Math.floor(secondsInt / 3600);
	const mins = Math.floor((secondsInt % 3600) / 60);
	const secs = Math.floor(secondsInt) % 60;
	let ret = '';

	if (hrs > 0) {
		ret += `${hrs}:${mins < 10 ? '0' : ''}`;
	}

	ret += `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	return some(ret);
}

const dateToString = (date: Option<Date>): string =>
	pipe(
		date,
		map((d) => d.toISOString()),
		withDefault(''),
	);

// ----- Exports ----- //

export {
	makeRelativeDate,
	format as formatDate,
	isValidDate,
	fromString,
	formatSeconds,
	formatLocal,
	dateToString,
	padZero,
};
