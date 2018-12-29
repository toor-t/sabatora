/**
 * AppTopState
 */

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppTopActions } from '../actions/AppTopAction';
import { AppTopSelected } from '../components/AppTopComponent';

/**
 * AppTopState
 */
export type AppTopState = {
    /**
     * ドロワー開閉状態
     */
    drawerOpened: boolean;
    /**
     * 選択されたメニューのインデックス
     */
    selectedIndex: number;
};
const initialState: AppTopState = {
    drawerOpened: false,
    selectedIndex: AppTopSelected.CreateForm
};

/**
 * AppTopStateReducer
 */
export const AppTopStateReducer = reducerWithInitialState<AppTopState>(initialState)
    /**
     * Open Drawer
     */
    .case(AppTopActions.openDrawer, state => {
        return Object.assign({}, state, { drawerOpened: true });
    })
    /**
     * Close Drawer
     */
    .case(AppTopActions.closeDrawer, state => {
        return Object.assign({}, state, { drawerOpened: false });
    })
    /**
     * Select Menu Item
     * ドロワーメニュー項目選択
     */
    .case(AppTopActions.selectMenuItem, (state, selectedIndex) => {
        return Object.assign({}, state, { selectedIndex });
    });
