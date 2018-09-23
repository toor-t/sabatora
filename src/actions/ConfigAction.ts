'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IConfigActions {
    updateValue: (v: boolean) => Action<boolean>;
}

const actionCreator = actionCreatorFactory('CONFIG_ACTIONS');

export const ConfigActions = {
    updateValue: actionCreator<boolean>('UPDATE_VALUE')
};
