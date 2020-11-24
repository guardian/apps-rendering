import { isObject } from 'lib';
import { logger } from 'logger';
import { map, OptionKind, some, none } from '@guardian/types/option';
import type { Option } from '@guardian/types/option';
import fs from 'fs';
import util from 'util';

type AssetMapping = Record<string, string | undefined> | null;

function getAssetMappings(): AssetMapping {
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	const manifestLocation = process.env.ASSETS_MANIFEST;

	if (!manifestLocation) {
		logger.error('Environment variable ASSETS_MANIFEST not set');
		throw new Error('Environment variable ASSETS_MANIFEST not set');
	}

	try {
		const parsed: unknown = JSON.parse(
			fs.readFileSync(manifestLocation).toString(),
		);

		if (!isObject(parsed)) {
			throw new Error("Manifest file doesn't appear to be an object");
		}

		return Object.entries(parsed).reduce(
			(mappings, [key, value]) =>
				typeof value === 'string'
					? { ...mappings, [key]: value }
					: mappings,
			{},
		);
	} catch (e) {
		logger.error(`Unable to load asset mapping`, e);
		throw e;
	}
}

export function getMappedAssetLocation(): (assetName: string) => string {
	const scriptMappings = getAssetMappings();
	if (scriptMappings) {
		return (assetName: string): string => {
			const mappedAsset = scriptMappings[assetName] ?? assetName;
			return `/assets/${mappedAsset}`;
		};
	} else {
		return (assetName: string): string => `/assets/${assetName}`;
	}
}

export async function getInlineScript(
	getAssetLocation: (assetName: string) => string,
): Promise<Option<string>> {
	const clientScript = map(getAssetLocation)(some('editions.js'));

	if (clientScript.kind === OptionKind.Some) {
		const readFilePromise = util.promisify(fs.readFile);
		const file = `${__dirname}${clientScript.value}`;
		try {
			const inlineScriptBuffer = await readFilePromise(file);
			return some(inlineScriptBuffer.toString());
		} catch (e) {
			console.error(
				`Unable to find the file: ${file}. Falling back to fetching editions.js file`,
			);
		}
	}

	return none;
}
