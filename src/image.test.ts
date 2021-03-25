// ----- Imports ----- //

import { JSDOM } from 'jsdom';
import type { Image as CardImage } from '@guardian/apps-rendering-api-models/image';
import { parseCardImage, parseImage, Image } from 'image';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { none, OptionKind, Role, some, withDefault } from '@guardian/types';
import { ImageElementFields } from '@guardian/content-api-models/v1/imageElementFields';
import { Context } from 'types/parserContext';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { AssetFields } from '@guardian/content-api-models/v1/assetFields';

// ----- Mocks ----- //
let imageBlock: BlockElement;
let imageData: ImageElementFields;
let context: Context;
let asset: Asset;
let cardImage: CardImage;
let assetTypeData: AssetFields;
const assetWidth = 5;
const assetHeight = 5;
const imageDataCredit = 'Credit';
const defaultImage: Image = {
	src: '',
	srcset: '',
	dpr2Srcset: '',
	alt: none,
	width: 0,
	height: 0,
	caption: none,
	credit: none,
	nativeCaption: none,
	role: Role.Standard,
};
const roleTestCases = [
	{
		role: 'thumbnail',
		roleEnum: Role.Thumbnail,
	},
	{
		role: 'halfWidth',
		roleEnum: Role.HalfWidth,
	},
	{
		role: 'thumanyThingElsebnail',
		roleEnum: Role.Standard,
	},
];
const expectedSrcset =
	'https://i.guim.co.uk/img/theguardian/?width=140&quality=85&fit=bounds&s=ac6b008b5309f7949d1087af108c1d03 140w, https://i.guim.co.uk/img/theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b 500w, https://i.guim.co.uk/img/theguardian/?width=1000&quality=85&fit=bounds&s=9b5034dd81e916d352709a20f6635448 1000w, https://i.guim.co.uk/img/theguardian/?width=1500&quality=85&fit=bounds&s=2c439ea2daa935d4a2a268ef7a2a9146 1500w, https://i.guim.co.uk/img/theguardian/?width=2000&quality=85&fit=bounds&s=3877ef3c2ed016cccf1ab7b6e6001841 2000w, https://i.guim.co.uk/img/theguardian/?width=2500&quality=85&fit=bounds&s=81d2b2f5b95615f1d47d61f64f5e61a6 2500w, https://i.guim.co.uk/img/theguardian/?width=3000&quality=85&fit=bounds&s=b362f368e5f123ce2c7b45dedee361db 3000w';
const expectedDpr2Srcset =
	'https://i.guim.co.uk/img/theguardian/?width=140&quality=45&fit=bounds&s=7c3b49aa008fdd8970b8666fa745b172 140w, https://i.guim.co.uk/img/theguardian/?width=500&quality=45&fit=bounds&s=88ff17dc42cac7e76d0670385a7755ee 500w, https://i.guim.co.uk/img/theguardian/?width=1000&quality=45&fit=bounds&s=5a22db10fa466232189124d82bcb0ee5 1000w, https://i.guim.co.uk/img/theguardian/?width=1500&quality=45&fit=bounds&s=8214d581fb7adf78b3c6ff1aa780124d 1500w, https://i.guim.co.uk/img/theguardian/?width=2000&quality=45&fit=bounds&s=686301d1879e13b008002cf9b089aa74 2000w, https://i.guim.co.uk/img/theguardian/?width=2500&quality=45&fit=bounds&s=623e18ec906f4d4b6d3cbabf675e9c4f 2500w, https://i.guim.co.uk/img/theguardian/?width=3000&quality=45&fit=bounds&s=63534271489a79fe83497057e7c8f158 3000w';
const expectedSrc =
	'https://i.guim.co.uk/img/theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b';

// ----- Tests ----- //

describe('parseImage', () => {
	beforeEach(() => {
		context = {
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		};
		imageData = {
			caption: 'Caption',
			credit: 'Credit',
			displayCredit: true,
			alt: 'someAlt',
		};

		assetTypeData = {
			isMaster: true,
			width: assetWidth,
			height: assetHeight,
		};

		asset = {
			type: AssetType.IMAGE,
			file: 'https://theguardian.com',
			typeData: assetTypeData,
		};

		imageBlock = {
			type: ElementType.IMAGE,
			assets: [asset],
			imageTypeData: imageData,
		};
	});

	test('returns image', () => {
		let actual: Image = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);

		expect(actual.src).toBe(expectedSrc);
		expect(actual.srcset).toBe(expectedSrcset);
		expect(actual.dpr2Srcset).toBe(expectedDpr2Srcset);
		expect(actual.alt).toEqual(some(imageData.alt));
		expect(actual.width).toEqual(assetWidth);
		expect(actual.height).toEqual(assetHeight);
		expect(actual.caption.kind).toEqual(OptionKind.Some);
		expect(actual.credit).toEqual(some(imageDataCredit));
		expect(actual.nativeCaption).toEqual(some(imageData.caption));
		expect(actual.role).toBe(Role.Standard);
	});

	test('returns none given no assets in element', () => {
		imageBlock.assets = [];
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset with no typeData', () => {
		asset.typeData = undefined;
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset typedata with falsey isMaster', () => {
		asset.typeData = {
			isMaster: false,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset file is undefined', () => {
		asset.file = undefined;
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset file is empty', () => {
		asset.file = '';
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset typedata width is undefined', () => {
		asset.typeData = {
			isMaster: true,
			height: assetHeight,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('returns none given an asset typedata height is undefined', () => {
		asset.typeData = {
			isMaster: true,
			width: assetWidth,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});

	test('uses secureFile rather than asset file for srcsets if it exists', () => {
		assetTypeData.secureFile = 'https://secure-theguardian.com';
		const expectedSecureDpr2Srcset =
			'https://i.guim.co.uk/img/secure-theguardian/?width=140&quality=45&fit=bounds&s=7c3b49aa008fdd8970b8666fa745b172 140w, https://i.guim.co.uk/img/secure-theguardian/?width=500&quality=45&fit=bounds&s=88ff17dc42cac7e76d0670385a7755ee 500w, https://i.guim.co.uk/img/secure-theguardian/?width=1000&quality=45&fit=bounds&s=5a22db10fa466232189124d82bcb0ee5 1000w, https://i.guim.co.uk/img/secure-theguardian/?width=1500&quality=45&fit=bounds&s=8214d581fb7adf78b3c6ff1aa780124d 1500w, https://i.guim.co.uk/img/secure-theguardian/?width=2000&quality=45&fit=bounds&s=686301d1879e13b008002cf9b089aa74 2000w, https://i.guim.co.uk/img/secure-theguardian/?width=2500&quality=45&fit=bounds&s=623e18ec906f4d4b6d3cbabf675e9c4f 2500w, https://i.guim.co.uk/img/secure-theguardian/?width=3000&quality=45&fit=bounds&s=63534271489a79fe83497057e7c8f158 3000w';
		const expectedSecureSrcset =
			'https://i.guim.co.uk/img/secure-theguardian/?width=140&quality=85&fit=bounds&s=ac6b008b5309f7949d1087af108c1d03 140w, https://i.guim.co.uk/img/secure-theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b 500w, https://i.guim.co.uk/img/secure-theguardian/?width=1000&quality=85&fit=bounds&s=9b5034dd81e916d352709a20f6635448 1000w, https://i.guim.co.uk/img/secure-theguardian/?width=1500&quality=85&fit=bounds&s=2c439ea2daa935d4a2a268ef7a2a9146 1500w, https://i.guim.co.uk/img/secure-theguardian/?width=2000&quality=85&fit=bounds&s=3877ef3c2ed016cccf1ab7b6e6001841 2000w, https://i.guim.co.uk/img/secure-theguardian/?width=2500&quality=85&fit=bounds&s=81d2b2f5b95615f1d47d61f64f5e61a6 2500w, https://i.guim.co.uk/img/secure-theguardian/?width=3000&quality=85&fit=bounds&s=b362f368e5f123ce2c7b45dedee361db 3000w';

		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);

		expect(parsedImage.srcset).toEqual(expectedSecureSrcset);
		expect(parsedImage.dpr2Srcset).toEqual(expectedSecureDpr2Srcset);
	});

	test('returns image with no credit given displayCredit is false', () => {
		imageData.displayCredit = false;

		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);

		expect(parsedImage.credit).toEqual(none);
	});

	test('returns image with no caption given imageData caption is undefined', () => {
		imageData.caption = undefined;

		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);

		expect(parsedImage.caption).toEqual(none);
		expect(parsedImage.nativeCaption).toEqual(none);
	});

	test('returns image with no alt given imageData alt is undefined', () => {
		imageData.alt = undefined;

		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);

		expect(parsedImage.alt).toEqual(none);
	});

	roleTestCases.forEach((roleTestCase) => {
		test('returns correct role given image data role', () => {
			imageData.role = roleTestCase.role;

			const parsedImage = withDefault(defaultImage)(
				parseImage(context)(imageBlock),
			);

			expect(parsedImage.role).toEqual(roleTestCase.roleEnum);
		});
	});
});

describe('parseCardImage', () => {
	beforeEach(() => {
		context = {
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		};
		cardImage = {
			url: 'https://theguardian.com',
			height: 20,
			width: 10,
			altText: 'someAltText',
		};
	});

	test('returns card image', () => {
		const expected = {
			src: expectedSrc,
			srcset: expectedSrcset,
			dpr2Srcset: expectedDpr2Srcset,
			alt: some(cardImage.altText),
			width: cardImage.width,
			height: cardImage.height,
			caption: none,
			credit: none,
			nativeCaption: none,
			role: Role.Standard,
		};

		const parsed = withDefault(defaultImage)(
			parseCardImage(cardImage, context.salt),
		);

		expect(parsed).toEqual(expected);
	});

	test('returns none given image is undefined', () => {
		const parsed = parseCardImage(undefined, context.salt);
		expect(parsed).toEqual(none);
	});
});
