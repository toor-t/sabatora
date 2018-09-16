'use strict';
import { combineReducers, createStore } from 'redux';
import { ITextFormState, TextFormStateReducer } from './states/TextFormState';
import { ICheckBoxState, CheckBoxStateReducer } from './states/CheckBoxState';
import { IJikkenState, JikkenReducer } from './states/JikkenState';

export interface IAppState {
    textFormState: ITextFormState;
    checkBoxState: ICheckBoxState;

    jikkenState: IJikkenState;
}

const store = createStore(
    combineReducers<IAppState>({
        textFormState: TextFormStateReducer,
        checkBoxState: CheckBoxStateReducer,

        jikkenState: JikkenReducer
    })
);

export default store;
