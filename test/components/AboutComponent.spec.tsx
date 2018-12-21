import * as React from 'react';
import * as renderer from 'react-test-renderer';

import AboutComponent from '../../src/components/AboutComponent';

describe('AboutComponent', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<AboutComponent />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
