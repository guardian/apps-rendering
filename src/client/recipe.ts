import ReactDOM from 'react-dom';
import { createElement as h } from 'react';
import { Method, capiData } from 'components/recipe/article';

ReactDOM.hydrate(
    h(Method, { capi: capiData, pillar: undefined }, null),
    document.getElementById('method-wrapper')
 )