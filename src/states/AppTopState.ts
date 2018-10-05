//
// AppTopState
//
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppTopActions } from '../actions/AppTopAction';

export interface IAppTopState {
    drawerOpened: boolean;
}
const initialState: IAppTopState = {
    drawerOpened: false
};

export const AppTopStateReducer = reducerWithInitialState<IAppTopState>(initialState)
    .case(AppTopActions.openDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: true });
    })
    .case(AppTopActions.closeDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: false });
    });
