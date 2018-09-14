import * as React from 'react';
import './Application.css';
import CheckBoxContainer from './containers/CheckBoxContainer';
import TextForm2Container from './containers/TextForm2Container';
import TextFormContainer from './containers/TextFormContainer';

class Application extends React.Component {
    public render() {
        return (
            <div className="App">
                <TextFormContainer />
                <CheckBoxContainer />
                <TextForm2Container />
            </div>
        );
    }
}

export default Application;
