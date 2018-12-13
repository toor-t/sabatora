/**
 * ConfigState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ConfigActions } from '../actions/ConfigAction';

/**
 * IConfigState
 */
export interface IConfigState {
    checked: boolean;
}
const initialState: IConfigState = {
    checked: true
};

/**
 * ConfigStateReducer
 */
export const ConfigStateReducer = reducerWithInitialState<IConfigState>(initialState)
    /**
     * TODO: dummy
     */
    .case(ConfigActions.updateValue, (state, checked) => {
        return Object.assign({}, state, { checked });
    });
