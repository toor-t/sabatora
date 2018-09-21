'use strict';
import { combineReducers, createStore } from 'redux';

import { ICreateFormState, CreateFormStateReducer } from './states/CreateFormState';
import { ITextFormState, TextFormStateReducer } from './states/__TextFormState';
import { ICheckBoxState, CheckBoxStateReducer } from './states/__CheckBoxState';
import { IJikkenState, JikkenReducer } from './states/__JikkenState';

import { data_db, conf_db, makeDummyDB } from './db';

// Jikken  ダミーDB作成
// makeDummyDB();

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