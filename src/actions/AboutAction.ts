/**
 * AboutAction
 */
'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IAboutActions {
    updateValue: (v: boolean) => Action<boolean>;
}

const actionCreator = actionCreatorFactory('ABOUT_ACTIONS');

export const AboutActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
