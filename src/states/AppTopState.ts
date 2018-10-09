//
// AppTopState
//
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppTopActions } from '../actions/AppTopAction';
import { AppTopSelected } from '../components/AppTopComponent';

export interface IAppTopState {
    drawerOpened: boolean;
    selected: number;
}
const initialState: IAppTopState = {
    drawerOpened: false,
    selected: AppTopSelected.CreateForm
};

export const AppTopStateReducer = reducerWithInitialState<IAppTopState>(initialState)
    .case(AppTopActions.openDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: true });
    })
    .case(AppTopActions.closeDrawer, state => {
        // TODO:
        return Object.assign({}, state, { drawerOpened: false });
    })
    .case(AppTopActions.selectCreateForm, state => {
        // TODO:
        return Object.assign({}, state, { selected: AppTopSelected.CreateForm });
    })
    .case(AppTopActions.selectManageData, state => {
        // TODO:
        return Object.assign({}, state, { selected: AppTopSelected.ManageData });
    })
    .case(AppTopActions.selectConfig, state => {
        // TODO:
        return Object.assign({}, state, { selected: AppTopSelected.Config });
    })
    .case(AppTopActions.selectAbout, state => {
        // TODO:
        return Object.assign({}, state, { selected: AppTopSelected.About });
    });
