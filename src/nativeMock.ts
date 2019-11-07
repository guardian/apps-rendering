// ----- Functions ----- //

function ready(): void {
    console.log('NATIVE: received readiness confirmation');
    insertAds();
}

const randomColourVal = (): number => Math.round(Math.random() * 256);

const randomRGB = (): string => `rgb(${randomColourVal()}, ${randomColourVal()}, ${randomColourVal()})`;

function buildAd(): Node {

    const ad = document.createElement('div');
    const para = document.createElement('p');
    const randColour = randomRGB();

    Object.assign(ad.style, {
        width: '100%',
        height: 'calc(100% - 40px)',
        backgroundColor: randColour,
        position: 'relative',
    });

    Object.assign(para.style, {
        margin: '0',
        color: randColour,
        position: 'absolute',
        filter: 'invert(1)',
        top: 'calc(50% - 36px)',
        left: 'calc(50% - 50px)',
        textAlign: 'center',
        width: '100px',
    });

    para.textContent = 'This is an ad loaded on the client';
    ad.appendChild(para);

    return ad;

}

function insertAds(): void {
    document.querySelectorAll('.ad-placeholder').forEach(ad => ad.appendChild(buildAd()));
}


// ----- Exports ----- //

export {
    ready,
};
