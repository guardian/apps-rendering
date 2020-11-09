import { Configuration } from 'webpack';
import { clientConfig } from '../webpack.config';

export default async ({
	config,
}: {
	config: Configuration;
}): Promise<Configuration> => {
	return {
		...config,
		resolve: clientConfig?.resolve,
		module: {
			rules: clientConfig?.module?.rules ?? [],
		},
		plugins: [...(config.plugins ?? [])],
	};
};
