import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BlockElement } from 'mapiThriftModels/BlockElement';
import { None, Option } from 'types/option';
import HeaderImage from 'components/shared/headerImage';

configure({ adapter: new Adapter() });

describe('HeaderImage component renders as expected', () => {
    it('Renders null if no block element', () => {
        const blockElement: Option<BlockElement> = new None;
        const headerImage = shallow(<HeaderImage image={blockElement} imageSalt=""/>)
        expect(headerImage.html()).toBe(null);
    })
});