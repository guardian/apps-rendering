import { createElement as h, ReactNode, ReactElement } from 'react';
import Paragraph from 'components/paragraph';

function insertPlaceholders(reactNodes: ReactNode[]): ReactNode[] {
    const adIndices = [3, 9];
    const flattenedNodes = reactNodes.flat();

    const isPara = (node: ReactElement): boolean =>
        node?.type === Paragraph;

    const numParas = flattenedNodes.filter(isPara).length;

    const className = numParas < 15 ? 'ad-placeholder hidden short' : 'ad-placeholder hidden';

    const ad = (para: number): ReactElement => h('aside', { className, key: `ad-after-${para}-para` },
        h('div', { className: 'ad-labels' },
            h('h1', null, 'Advertisement'),
            h('button', { className: 'ad-hide' },
                h('span', null, 'Hide')
            )
        ),
        h('div', { className: 'ad-slot' }, null)
    );

    const insertAd = (para: number, nodes: ReactNode[]): ReactNode[] =>
        adIndices.includes(para) ? [...nodes, ad(para)] : nodes;

    return flattenedNodes
        .reduce(([paraNum, prevNodes], node) => {
            const nodes = [ ...prevNodes, node ];
            if (isPara(node)) {
                const newParaNum = paraNum + 1;
                return [ newParaNum, insertAd(newParaNum, nodes) ];
            }
            return [ paraNum, nodes ];
        }, [0, []])
        .pop();
}

const getAdPlaceholderInserter =
    (shouldHideAdverts: boolean): (reactNodes: ReactNode[]) => ReactNode[] =>
        shouldHideAdverts
            ? (reactNodes: ReactNode[]): ReactNode[] => reactNodes
            : insertPlaceholders

export { getAdPlaceholderInserter }
