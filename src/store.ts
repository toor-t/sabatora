/**
 * store
 */
'use strict';
import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import reduxThunk from 'redux-thunk';
import { IAppTopState, AppTopStateReducer } from './states/AppTopState';
import { ICreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { IAboutState, AboutStateReducer } from './states/AboutState';
import { IConfigState, ConfigStateReducer } from './states/ConfigState';
import { IManageDataState, ManageDataStateReducer } from './states/ManageDataState';

/**
 * IAppState
 */
export interface IAppState {
    appTopState: IAppTopState;
    createFormState: ICreateFormState;
    aboutState: IAboutState;
    configState: IConfigState;
    manageDataState: IManageDataState;
}

/**
 * store
 */
const store = createStore<IAppState, AnyAction, {}, {}>(
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
