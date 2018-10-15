/**
 * app
 */
'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';
import store from './store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        mainElement
    );
};

render(Application);

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
    module.hot.accept('./Application', () => {
        import('./Application').then(World => {
            render(World.default);
        });
    });
}
