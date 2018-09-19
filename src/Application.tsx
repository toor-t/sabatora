'use strict';
import * as React from 'react';
import './Application.css';
import __CheckBoxContainer from './containers/__CheckBoxContainer';
import __TextFormContainer from './containers/__TextFormContainer';
import __JikkenContainer from './containers/__JikkenContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <__JikkenContainer />
        </div>
    );
};

export default Application;
