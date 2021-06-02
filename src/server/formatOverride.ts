import type { Item } from 'item';

export const overideFormatValues = (
	item: Item,
	formatParams?: string[],
): Item => {
	if (formatParams) {
		const design = parseInt(formatParams[0]);
		const display = parseInt(formatParams[1]);
		const theme = parseInt(formatParams[2]);

		return { ...item, design, display, theme };
	}
	return item;
};
