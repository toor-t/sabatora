import * as React from 'react';
import './Application.css';
import CheckBoxContainer from './containers/CheckBoxContainer';
import TextFormContainer from './containers/TextFormContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <TextFormContainer />
            <CheckBoxContainer />
        </div>
    );
};

export default Application;
