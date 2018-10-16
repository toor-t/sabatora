/**
 * AppTopState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppTopActions } from '../actions/AppTopAction';
import { AppTopSelected } from '../components/AppTopComponent';

/**
 * IAppTopState
 */
export interface IAppTopState {
    drawerOpened: boolean;
    selected: number;
}
const initialState: IAppTopState = {
    drawerOpened: false,
    selected: AppTopSelected.CreateForm
};

/**
 * AppTopStateReducer
 */
export const AppTopStateReducer = reducerWithInitialState<IAppTopState>(initialState)
    .case(AppTopActions.openDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: true });
    })
    .case(AppTopActions.closeDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: false });
    })
    // ドロワーメニュー項目選択
    .case(AppTopActions.selectMenuItem, (state, selected) => {
        return Object.assign({}, state, { selected });
    });
