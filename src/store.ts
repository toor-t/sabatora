import { combineReducers, createStore } from 'redux';
import { ITextForm2State, textForm2StateReducer } from './states/TextForm2State';
import { ITextFormState, textFormStateReducer } from './states/TextFormState';

export interface IAppState {
    textForm2State: ITextForm2State;
    textFormState: ITextFormState;
}

const store = createStore(
    combineReducers<IAppState>({
        textForm2State: textForm2StateReducer,
        textFormState: textFormStateReducer
    })
);

export default store;
