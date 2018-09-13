import * as React from 'react';

import CounterContainer from '../containers/CounterContainer';
import Example from '../components/Example';

const Application = () => (
    <div>
        Hello World from Electron!
        <CounterContainer />
        <Example />
    </div>
);

export default Application;
