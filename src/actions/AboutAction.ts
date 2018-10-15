/**
 * AboutAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ABOUT_ACTIONS');

/**
 * AboutActions
 */
export const AboutActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
