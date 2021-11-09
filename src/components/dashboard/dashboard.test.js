import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';

let wrapped = shallow(<Dashboard />);

describe('Dashboard', () => {
    it('should render the Dashboard Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
})