import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './home-page';

let wrapped = shallow(<HomePage />);

describe('HomePage', () => {
    it('should render the HomePage correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
})