//
// Application
//
'use strict';
import * as React from 'react';
import './bootstrap.css';
import './Application.css';

import AppTopContainer from './containers/AppTopContainer';

import CssBaseline from '@material-ui/core/CssBaseline';
// import 'typeface-roboto';

const Application: React.SFC = () => {
    return (
        <React.Fragment>
            <CssBaseline>
                <div className="App">
                    <AppTopContainer />
                </div>
            </CssBaseline>
        </React.Fragment>
    );
};

export default Application;
