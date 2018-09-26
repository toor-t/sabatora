//
// ConfigState
//
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ConfigActions } from '../actions/ConfigAction';

export interface IConfigState {
    checked: boolean;
}
const initialState: IConfigState = {
    checked: true
};

export const ConfigStateReducer = reducerWithInitialState<IConfigState>(initialState).case(
    ConfigActions.updateValue,
    (state, checked) => {
        return Object.assign({}, state, { checked });
    }
);
