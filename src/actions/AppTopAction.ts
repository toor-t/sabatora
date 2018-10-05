'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IAppTopActions {
    openDrawer: () => Action<void>;
    closeDrawer: () => Action<void>;
}

const actionCreator = actionCreatorFactory('APP_TOP_ACTIONS');

export const AppTopActions = {
    openDrawer: actionCreator<void>('OPEN_DRAWER'),
    closeDrawer: actionCreator<void>('CLOSE_DRAWER')
};
