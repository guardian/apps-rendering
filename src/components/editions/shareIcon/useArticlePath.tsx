import { useEffect, useState } from 'react';

const isSuccessOrRedirect = (status: number) => [302, 200].includes(status);

export const useArticlePath = (webUrl: string) => {
	const [articlePath, setArticlePath] = useState<string | null>(null);

	useEffect(() => {
		if (webUrl) {
			const checkPathExists = async (articlePath: string) => {
				const dotComResult = await fetch(`${articlePath}`, {
					method: 'HEAD',
				}).catch(() => null);
				console.log(dotComResult);
				return dotComResult && isSuccessOrRedirect(dotComResult.status)
					? setArticlePath(articlePath)
					: setArticlePath(null);
			};
			checkPathExists(webUrl);
		}
	}, [webUrl]);

	return { articlePath };
};
