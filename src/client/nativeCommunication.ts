import { AdSlot } from "@guardian/bridget/AdSlot";
import { VideoSlot } from "@guardian/bridget/VideoSlot";
import { Image } from "@guardian/bridget/Image";
import { Rect, IRect } from "@guardian/bridget/Rect";
import { commercialClient, galleryClient, userClient, acquisitionsClient, videoClient } from "../native/nativeApi";
import { memoise, isObject, errorToString } from 'lib';
import { logger } from 'logger';

type Slot = AdSlot | VideoSlot;

function areRectsEqual(rectA: IRect, rectB: IRect): boolean {
    return rectA.height === rectB.height &&
        rectA.width === rectB.width &&
        rectA.x === rectB.x &&
        rectA.y === rectB.y
}

function positionChanged(slotsA: Slot[], slotsB: Slot[]): boolean {
    if (slotsA.length !== slotsB.length) return true;
    return !slotsA.every((slot, index) => areRectsEqual(slot.rect, slotsB[index].rect))
}

function getRect(slotPosition: DOMRect): Rect {
    const scrollLeft = document.scrollingElement
        ? document.scrollingElement.scrollLeft : document.body.scrollLeft;
    const scrollTop = document.scrollingElement
        ? document.scrollingElement.scrollTop : document.body.scrollTop;

    return new Rect({
        x: slotPosition.left + scrollLeft,
        y: slotPosition.top + scrollTop,
        width: slotPosition.width,
        height: slotPosition.height
    })
}

const getTargetingParams: () => Map<string, string> = memoise(() => {
    const content = document.getElementById('targeting-params')?.innerHTML ?? '{}';
    const parsed: unknown = JSON.parse(content);
    const map = new Map<string, string>();

    if (!isObject(parsed)) {
        return map;
    }

    for (const key in parsed) {
        const value = parsed[key];

        if (typeof value === 'string') {
            map.set(key, value);
        }
    }

    return map;
});

function getAdSlots(): AdSlot[] {
    const advertSlots = document.getElementsByClassName('ad-slot');
    const targetingParams = getTargetingParams();

    if (!advertSlots) {
        return [];
    }

    return Array.from(advertSlots).map(adSlot => {
        const slotPosition = adSlot.getBoundingClientRect();
        return new AdSlot({
            rect: getRect(slotPosition),
            targetingParams
        })
    });
}

function insertAds(): void {
    const adSlots = getAdSlots();
    if (adSlots.length > 0) {
        void commercialClient.insertAdverts(adSlots);
    }
}

function ads(): void {
    void userClient.isPremium().then(premiumUser => {
        if (!premiumUser) {
            Array.from(document.querySelectorAll('.ad-placeholder'))
                .forEach(placeholder => placeholder.classList.remove('hidden'))
            insertAds();
            Array.from(document.querySelectorAll('.ad-labels, .upgrade-banner button'))
                .forEach(adLabel => {
                    adLabel.addEventListener('click', () => {
                        void acquisitionsClient.launchFrictionScreen();
                    })
                })
        }
    })
}

function getImageWidth(src: string): number {
    const url = new URL(src);
    const width = parseInt(url.searchParams.get('width') ?? '0');
    const dpr = window.devicePixelRatio >= 1.25 ? 2 : 1;
    return Math.max(screen.height * dpr, screen.width * dpr, width);
}

function launchSlideshow(src: string | null): void {
    const images = Array.from(document.querySelectorAll('.js-launch-slideshow'));
    const title = document.title;
    const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
        if (image instanceof HTMLImageElement) {
            const url = image?.currentSrc ?? image.src;
            const caption =  image.getAttribute('data-caption') ?? undefined;
            const credit = image.getAttribute('data-credit') ?? undefined;
            const width = getImageWidth(url);
            const height = width * parseFloat(image.getAttribute('data-ratio') ?? '0.56');
            if (isNaN(width) || isNaN(height)) {
                return [];
            }
            return new Image({ url, caption, credit, width, height });
        } else {
            return [];
        }
    });
    const clickedImageIndex = images.findIndex((image: Element) => image.getAttribute('src') === src);
    if (imagesWithCaptions.length && clickedImageIndex >= 0) {
        void galleryClient.launchSlideshow(imagesWithCaptions, clickedImageIndex, title);
    }
}

function slideshow(): void {
    const images = document.querySelectorAll('.js-launch-slideshow');
    Array.from(images)
        .forEach((image: Element) => image.addEventListener('click', (e: Event) => {
            launchSlideshow(image.getAttribute('src'));
        }));
}

function getVideoSlots(): VideoSlot[] {
    const videoSlots = document.querySelectorAll('.native-video');

    if (!videoSlots) {
        return [];
    }

    return Array.from(videoSlots).reduce((slots: VideoSlot[], elem) => {
        const slotPosition = elem.getBoundingClientRect();
        const videoId =  elem.getAttribute('data-videoId');
        const posterUrl = elem.getAttribute('data-posterUrl');
        const durationString = elem.getAttribute('data-duration');
        const rect = getRect(slotPosition);
        if (videoId && posterUrl) {
            if (durationString && !isNaN(parseInt(durationString))) {
                const duration = parseInt(durationString);
                return [ ...slots, new VideoSlot({ rect, videoId, posterUrl, duration }) ];
            } else {
                return [ ...slots, new VideoSlot({ rect, videoId, posterUrl }) ];
            }
        }
        return slots;
    }, []);
}

function videos(): void {
    const videoSlots = getVideoSlots();
    if (videoSlots.length > 0) {
        void videoClient.insertVideos(videoSlots);
    }
}

function reportNativeElementPositionChanges(): void {
    let adSlots = getAdSlots();
    let videoSlots = getVideoSlots();

    const targetNode = document.querySelector('html') as Node;
    const config: MutationObserverInit = {
        childList: true,
        subtree: true,
        attributeFilter: ["style"]
    };
    const callback = function(): void {
        const currentAdSlots = getAdSlots();
        const currentVideoSlots = getVideoSlots();

        if (positionChanged(currentAdSlots, adSlots)) {
            adSlots = currentAdSlots;
            void commercialClient.updateAdverts(currentAdSlots);
        }

        if (positionChanged(currentVideoSlots, videoSlots)) {
            videoSlots = currentVideoSlots;
            void videoClient.updateVideos(currentVideoSlots);
        }
    };

    let currentAnimationFrame: number | null = null;
    window.addEventListener('resize', () => {
        if (currentAnimationFrame !== null) {
            window.cancelAnimationFrame(currentAnimationFrame);
        }
        currentAnimationFrame = window.requestAnimationFrame(callback);
    }, false);
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    try {
        void document.fonts.ready.then(() => {
            void commercialClient.updateAdverts(getAdSlots());
            void videoClient.updateVideos(getVideoSlots());
        });
    } catch (e) {
        logger.error(`font loading API not supported: ${errorToString(e, 'unknown reason')}`);
    }
}

export {
    ads,
    slideshow,
    videos,
    reportNativeElementPositionChanges
};
