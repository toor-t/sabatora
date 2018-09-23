'use strict';
import * as React from 'react';
import './bootstrap.css';
// import './Application.css';
import AboutContainer from './containers/AboutContainer';
import ConfigContainer from './containers/ConfigContainer';
import ManageDataContainer from './containers/ManageDataContainer';

import CreateFormContainer from './containers/CreateFormContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <CreateFormContainer />
        </div>
    );
};

export default Application;
