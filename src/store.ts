import { combineReducers, createStore } from 'redux';
import { ITextForm2State, TextForm2StateReducer } from './states/TextForm2State';
import { ITextFormState, TextFormStateReducer } from './states/TextFormState';
import { ICheckBoxState, CheckBoxStateReducer } from './states/CheckBoxState';

export interface IAppState {
    textForm2State: ITextForm2State;
    textFormState: ITextFormState;
    checkBoxState: ICheckBoxState;
}

const store = createStore(
    combineReducers<IAppState>({
        textForm2State: TextForm2StateReducer,
        textFormState: TextFormStateReducer,
        checkBoxState: CheckBoxStateReducer
    })
);

export default store;
