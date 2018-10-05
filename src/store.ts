//
// store
//
'use strict';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { IAppTopState, AppTopStateReducer } from './states/AppTopState';
import { ICreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { IAboutState, AboutStateReducer } from './states/AboutState';
import { IConfigState, ConfigStateReducer } from './states/ConfigState';
import { IManageDataState, ManageDataStateReducer } from './states/ManageDataState';

export interface IAppState {
    appTopState: IAppTopState;
    createFormState: ICreateFormState;
    aboutState: IAboutState;
    configState: IConfigState;
    manageDataState: IManageDataState;
}

const store = createStore(
    combineReducers<IAppState>({
        appTopState: AppTopStateReducer,
        createFormState: CreateFormStateReducer,
        aboutState: AboutStateReducer,
        configState: ConfigStateReducer,
        manageDataState: ManageDataStateReducer
    }),
    applyMiddleware(reduxThunk)
);

export default store;
