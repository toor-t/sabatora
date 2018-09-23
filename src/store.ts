'use strict';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { ICreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { IAboutState, AboutStateReducer } from './states/AboutState';
import { IConfigState, ConfigStateReducer } from './states/ConfigState';
import { IManageDataState, ManageDataStateReducer } from './states/ManageDataState';
import { ITextFormState, TextFormStateReducer } from './states/__TextFormState';

import { data_db, conf_db, makeDummyDB } from './db';

// Jikken  ダミーDB作成
// makeDummyDB();

export interface IAppState {
    createFormState: ICreateFormState;
    aboutState: IAboutState;
    configState: IConfigState;
    manageDataState: IManageDataState;

    textFormState: ITextFormState;
}

const store = createStore(
    combineReducers<IAppState>({
        createFormState: CreateFormStateReducer,
        aboutState: AboutStateReducer,
        configState: ConfigStateReducer,
        manageDataState: ManageDataStateReducer,

        textFormState: TextFormStateReducer
    }),
    applyMiddleware(reduxThunk)
);

export default store;
