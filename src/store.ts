import { combineReducers, createStore } from 'redux';
import { ITextForm2State, TextForm2StateReducer } from './states/TextForm2State';
import { ITextFormState, TextFormStateReducer } from './states/TextFormState';

export interface IAppState {
    textForm2State: ITextForm2State;
    textFormState: ITextFormState;
}

const store = createStore(
    combineReducers<IAppState>({
        textForm2State: TextForm2StateReducer,
        textFormState: TextFormStateReducer
    })
);

export default store;
