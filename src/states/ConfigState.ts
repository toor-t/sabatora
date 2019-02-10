/**
 * ConfigState
 */

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ConfigActions } from '../actions/ConfigAction';

/**
 * ConfigState
 */
export type ConfigState = {
    checked: boolean;
};
const initialState: ConfigState = {
    checked: true
};

/**
 * ConfigStateReducer
 */
export const ConfigStateReducer = reducerWithInitialState<ConfigState>(initialState)
    /**
     * TODO: dummy
     */
    .case(ConfigActions.updateValue, (state, checked) => {
        return Object.assign({}, state, { checked });
    });
