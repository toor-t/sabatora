'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IManageDataActions {
    updateValue: (v: boolean) => Action<boolean>;
}

const actionCreator = actionCreatorFactory('MANAGE_DATA');

export const ManageDataActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
