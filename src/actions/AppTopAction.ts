'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IAppTopActions {
    openDrawer: () => Action<void>;
    closeDrawer: () => Action<void>;
    selectCreateForm: () => Action<void>; // TODO:
    selectManageData: () => Action<void>; // TODO:
    selectConfig: () => Action<void>; // TODO:
    selectAbout: () => Action<void>; // TODO:
}

const actionCreator = actionCreatorFactory('APP_TOP_ACTIONS');

export const AppTopActions = {
    openDrawer: actionCreator<void>('OPEN_DRAWER'),
    closeDrawer: actionCreator<void>('CLOSE_DRAWER'),
    selectCreateForm: actionCreator<void>('SELECT_CREATE_FORM'),
    selectManageData: actionCreator<void>('SELECT_MANAGE_DATA'),
    selectConfig: actionCreator<void>('SELECT_CONFIG'),
    selectAbout: actionCreator<void>('SELECT_ABOUT')
};
