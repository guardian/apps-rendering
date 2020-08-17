// ----- Imports ----- //

import { Result, err, ok } from '@guardian/types/result';
import { errorToString } from 'lib';


// ----- Functions ----- //

const parse = (domParser: DOMParser) => (s: string): Result<string, DocumentFragment> => {

    try {
        const frag = new DocumentFragment();
        const docNodes = domParser.parseFromString(s, 'text/html').body.childNodes;

        Array.from(docNodes).forEach(node => frag.appendChild(node));
        return ok(frag);
    } catch (e) {
        const errString = errorToString(e, 'unknown reason');
        return err(`I wasn't able to parse the string into a DocumentFragment because: ${errString}`);
    }

}


// ----- Exports ----- //

export {
    parse,
}
