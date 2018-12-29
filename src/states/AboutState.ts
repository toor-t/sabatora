/**
 * AboutState
 */

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AboutActions } from '../actions/AboutAction';

/**
 * IAboutState
 */
export interface IAboutState {
    checked: boolean;
}
const initialState: IAboutState = {
    checked: true
};

/**
 * AboutStateReducer
 */
export const AboutStateReducer = reducerWithInitialState<IAboutState>(initialState)
    /**
     * TODO: dummy
     */
    .case(AboutActions.updateValue, (state, checked) => {
        return Object.assign({}, state, { checked });
    });
