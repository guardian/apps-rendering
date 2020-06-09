import { basePx, baseMultiply, darkModeCss } from './styles';
import { getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';

describe('helper functions return correct styles', () => {
    test('Calculates base pixels', () => {
        expect(basePx(1)).toBe('8px');
    });

    test('Calculates base multiplication', () => {
        expect(baseMultiply(4)).toBe(32);
    });

    test('Returns correct pillar styles for pillar', () => {
        const pillarStyles = getPillarStyles(Pillar.News);
        const expectedNewsPillarStyles =  {
            kicker: '#C70000',
            featureHeadline: '#AB0613',
            soft: '#FFF4F2',
            inverted: '#FF5943',
            liveblogBackground: '#AB0613'
        }
        expect(pillarStyles).toEqual(expectedNewsPillarStyles);
    });

    test('Returns correct dark mode styles', () => {
        const css = darkModeCss`a { text-decoration: none; color: ${`aliceblue`}; }`;
        const expectedCss = `@media(prefers-color-scheme:dark){a{text-decoration:none;color:aliceblue;}}`;
        expect(css.styles.trim().replace(/\s/g, '')).toEqual(expectedCss)
    });
});
