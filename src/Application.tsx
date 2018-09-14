import * as React from 'react';
import './Application.css';
import CheckBoxContainer from './containers/CheckBoxContainer';
import TextForm2Container from './containers/TextForm2Container';
import TextFormContainer from './containers/TextFormContainer';

const Application: React.SFC = () => {
    return (
        <div className="App">
            <TextFormContainer />
            <TextForm2Container />
            <CheckBoxContainer />
        </div>
    );
};

export default Application;
