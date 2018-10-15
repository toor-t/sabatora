/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';

/**
 * IManageDataState
 */
export interface IManageDataState {
    checked: boolean;
}
const initialState: IManageDataState = {
    checked: true
};

/**
 * ManageDataStateReducer
 */
export const ManageDataStateReducer = reducerWithInitialState<IManageDataState>(initialState).case(
    ManageDataActions.updateValue,
    (state, checked) => {
        return Object.assign({}, state, { checked });
    }
);
