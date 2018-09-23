'use strict';
import * as React from 'react';
import './bootstrap.css';
// import './Application.css';
import __CheckBoxContainer from './containers/__CheckBoxContainer';
import __TextFormContainer from './containers/__TextFormContainer';
import CreateFormContainer from './containers/CreateFormContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <CreateFormContainer />
        </div>
    );
};

export default Application;
