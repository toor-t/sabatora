'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface IJikkenActions {
    updateState: (s: any) => Action<any>;
}

const actionCreator = actionCreatorFactory();

export const JikkenActions = {
    updateState: actionCreator<any>('JIKKEN_ACTIONS_UPDATE_STATE')
};
