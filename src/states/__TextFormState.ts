'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TextFormActions } from '../actions/__TextFormAction';

export interface ITextFormState {
    value: string;
}

const initialState: ITextFormState = {
    value: 'こんにちは。'
};

export const TextFormStateReducer = reducerWithInitialState<ITextFormState>(initialState).case(
    TextFormActions.updateValue,
    (state, value) => {
        return Object.assign({}, state, { value });
    }
);
