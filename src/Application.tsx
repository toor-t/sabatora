//
// Application
//
'use strict';
import * as React from 'react';
import './bootstrap.css';
// import './Application.css';

import AppTopContainer from './containers/AppTopContainer';
import AboutContainer from './containers/AboutContainer';
import ConfigContainer from './containers/ConfigContainer';
import ManageDataContainer from './containers/ManageDataContainer';
import CreateFormContainer from './containers/CreateFormContainer';

import CssBaseline from '@material-ui/core/CssBaseline';
// import 'typeface-roboto';

const Application: React.SFC = () => {
    return (
        <React.Fragment>
            <CssBaseline>
                <div className="App">
                    {/* <CreateFormContainer /> */}
                    <AppTopContainer />
                </div>
            </CssBaseline>
        </React.Fragment>
    );
};

export default Application;
