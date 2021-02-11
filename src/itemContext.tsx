import type { Format } from '@guardian/types';
import type { FC } from 'react';
import React from 'react';
import type { ThemeStyles } from 'themeStyles';
//import { getThemeStyles } from 'themeStyles';
import { createContext } from 'utils/createContext';
import type { Item } from './item';
//import { getFormat } from './item';

interface ItemExtras {
	item: Item;
	format: Format;
	themeStyles: ThemeStyles;
}

const { useContext, ContextProvider } = createContext<Item>();

const useItem = useContext;

type Props = {
	item: Item;
};

const ItemProvider: FC<Props> = ({ item, children }) => {
	// const itemExtras = {
	// 	item,
	// 	format: getFormat(item),
	// 	themeStyles: getThemeStyles(item.theme),
	// };
	return <ContextProvider value={item}>{children}</ContextProvider>;
};

export { useItem, ItemProvider, ItemExtras };
