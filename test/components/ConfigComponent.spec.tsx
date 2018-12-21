import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ConfigComponent from '../../src/components/ConfigComponent';

describe('ConfigComponent', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ConfigComponent />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
