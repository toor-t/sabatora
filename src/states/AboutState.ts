'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AboutActions } from '../actions/AboutAction';

export interface IAboutState {
    checked: boolean;
}

const initialState: IAboutState = {
    checked: true
};

export const AboutStateReducer = reducerWithInitialState<IAboutState>(initialState).case(
    AboutActions.updateValue,
    (state, checked) => {
        return Object.assign({}, state, { checked });
    }
);
