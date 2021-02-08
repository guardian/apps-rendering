import { createContext } from 'utils/createContext';
import type { Item } from './item';

const { useContext, ContextProvider } = createContext<Item>();

export const useItem = useContext;
export const ItemProvider = ContextProvider;
