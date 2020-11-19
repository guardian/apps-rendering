declare module 'ReactNativeWebView' {
	global {
		interface Window {
			ReactNativeWebView: {
				postMessage: (data: string) => void;
			};
		}
	}
}

document
	.querySelector('.js-header .js-launch-slideshow')
	?.addEventListener('click', () => {
		window.ReactNativeWebView.postMessage(
			JSON.stringify({
				type: 'openLightbox',
				index: 0,
				isMainImage: 'true',
			}),
		);
	});

const body = document.querySelector('.js-body');
Array.from(body?.querySelectorAll('.js-launch-slideshow') ?? []).forEach(
	(image, index) => {
		image.addEventListener('click', () => {
			window.ReactNativeWebView.postMessage(
				JSON.stringify({
					type: 'openLightbox',
					index: index + 1,
					isMainImage: 'false',
				}),
			);
		});
	},
);
