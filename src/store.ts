/**
 * store
 */

import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AppTopState, AppTopStateReducer } from './states/AppTopState';
import { CreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { AboutState, AboutStateReducer } from './states/AboutState';
import { ConfigState, ConfigStateReducer } from './states/ConfigState';
import { ManageDataState, ManageDataStateReducer } from './states/ManageDataState';

/**
 * AppState
 */
export type AppState = {
    appTopState: AppTopState;
    createFormState: CreateFormState;
    aboutState: AboutState;
    configState: ConfigState;
    manageDataState: ManageDataState;
};

/**
 * store
 */
const store = createStore(
    combineReducers<AppState>({
        appTopState: AppTopStateReducer,
        createFormState: CreateFormStateReducer,
        aboutState: AboutStateReducer,
        configState: ConfigStateReducer,
        manageDataState: ManageDataStateReducer
    }),
    applyMiddleware(reduxThunk)
);

export default store;
