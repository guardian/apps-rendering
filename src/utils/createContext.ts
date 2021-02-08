import React from 'react';

export const createContext = <T extends unknown>(): {
	useContext: () => T;
	ContextProvider: React.Provider<T | undefined>;
} => {
	const context = React.createContext<T | undefined>(undefined);
	function useContext(): T {
		const safeContext = React.useContext(context);
		if (!safeContext)
			throw new Error(
				'useContext must be inside a Provider with a value',
			);
		return safeContext;
	}
	return { useContext, ContextProvider: context.Provider };
};
