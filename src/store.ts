import { combineReducers, createStore } from 'redux';
import { ITextFormState, TextFormStateReducer } from './states/TextFormState';
import { ICheckBoxState, CheckBoxStateReducer } from './states/CheckBoxState';

export interface IAppState {
    textFormState: ITextFormState;
    checkBoxState: ICheckBoxState;
}

const store = createStore(
    combineReducers<IAppState>({
        textFormState: TextFormStateReducer,
        checkBoxState: CheckBoxStateReducer
    })
);

export default store;
