'use strict';
import { combineReducers, createStore } from 'redux';

// Electron remote
import { remote } from 'electron';

import { ICreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { ITextFormState, TextFormStateReducer } from './states/__TextFormState';
import { ICheckBoxState, CheckBoxStateReducer } from './states/__CheckBoxState';
import { IJikkenState, JikkenReducer } from './states/__JikkenState';

// db
const DataStore = remote.require('nedb');
const data: Nedb = new DataStore({
    filename: './db/data.db', // TODO:  ファイル名
    autoload: true
    /*
	afterSerialization: hoge,
	beforeDeserialization: fuga,
	*/
});
const conf: Nedb = new DataStore({
    filename: './db/conf.db', // TODO: ファイル名
    autoload: true
});

export interface IAppState {
    createFormState: ICreateFormState;

    textFormState: ITextFormState;
    checkBoxState: ICheckBoxState;

    jikkenState: IJikkenState;
}

const store = createStore(
    combineReducers<IAppState>({
        createFormState: CreateFormStateReducer,

        textFormState: TextFormStateReducer,
        checkBoxState: CheckBoxStateReducer,

        jikkenState: JikkenReducer
    })
);

export default store;
