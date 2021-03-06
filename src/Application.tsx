/**
 * Application
 */

import * as React from 'react';
import './bootstrap.css';
import './Application.css';
import AppTopContainer from './containers/AppTopContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
// TODO: テーマ変更
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
// import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
// import orange from '@material-ui/core/colors/orange';
// import green from '@material-ui/core/colors/green';
// import blueGrey from '@material-ui/core/colors/blueGrey';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: lightBlue,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
    },
    typography: {
        useNextVariants: true
    }
});

const Application: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <CssBaseline>
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <AppTopContainer />
                    </div>
                </MuiThemeProvider>
            </CssBaseline>
        </React.Fragment>
    );
};

export default Application;
