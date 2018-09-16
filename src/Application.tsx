'use strict';
import * as React from 'react';
import './Application.css';
import CheckBoxContainer from './containers/CheckBoxContainer';
import TextFormContainer from './containers/TextFormContainer';
import JikkenContainer from './containers/JikkenContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <JikkenContainer />
        </div>
    );
};

export default Application;
