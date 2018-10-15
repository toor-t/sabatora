/**
 * ConfigAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('CONFIG_ACTIONS');

/**
 * ConfigActions
 */
export const ConfigActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
