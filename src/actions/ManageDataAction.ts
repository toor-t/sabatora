/**
 * ManageDataAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('MANAGE_DATA');

/**
 * ManageDataActions
 */
export const ManageDataActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
