// ----- Imports ----- //

import type { Option } from '@guardian/types';
import { fromNullable, map, withDefault } from '@guardian/types';
import type { ReactElement } from 'react';

// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C =>
	f(g(a));
const pipe = <A, B>(a: A, f: (_a: A) => B): B => f(a);
const pipe2 = <A, B, C>(a: A, f: (_a: A) => B, g: (_b: B) => C): C => g(f(a));
const pipe3 = <A, B, C, D>(
	a: A,
	f: (_a: A) => B,
	g: (_b: B) => C,
	h: (_c: C) => D,
): D => h(g(f(a)));

const identity = <A>(a: A): A => a;

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
	return node.nodeType === 1;
}

const toArray = Array.of.bind(null);

function memoise<A>(fn: () => A): () => A {
	let state: A | null = null;
	const memoised: () => A = () => {
		if (!state) {
			state = fn();
		}
		return state;
	};
	return memoised;
}

function errorToString(error: unknown, fallback: string): string {
	if (typeof error === 'object') {
		return error?.toString() ?? fallback;
	}

	return fallback;
}

// Based on a suggestion from the typescript-eslint project
// https://github.com/typescript-eslint/typescript-eslint/issues/2118#issuecomment-641464651
const isObject = (a: unknown): a is Record<string, unknown> =>
	typeof a === 'object' && a !== null;

const maybeRender = <A>(
	oa: Option<A>,
	f: (a: A) => ReactElement | null,
): ReactElement | null =>
	pipe2(oa, map(f), withDefault<ReactElement | null>(null));

function handleErrors(response: Response): Response | never {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

const index = (i: number) => <A>(arr: A[]): Option<A> => fromNullable(arr[i]);

// ----- Exports ----- //

export {
	compose,
	pipe,
	pipe2,
	pipe3,
	identity,
	isElement,
	toArray,
	memoise,
	errorToString,
	isObject,
	maybeRender,
	handleErrors,
	index,
};
