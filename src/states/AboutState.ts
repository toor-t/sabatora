/**
 * AboutState
 */

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AboutActions } from '../actions/AboutAction';

/**
 * AboutState
 */
export type AboutState = {
    checked: boolean;
};
const initialState: AboutState = {
    checked: true
};

/**
 * AboutStateReducer
 */
export const AboutStateReducer = reducerWithInitialState<AboutState>(initialState)
    /**
     * TODO: dummy
     */
    .case(AboutActions.updateValue, (state, checked) => {
        return Object.assign({}, state, { checked });
    });
