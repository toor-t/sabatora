import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface ICheckBoxActions {
    updateValue: (v: boolean) => Action<boolean>;
}

const actionCreator = actionCreatorFactory();

export const CheckBoxActions = {
    updateValue: actionCreator<boolean>('CHECK_BOX_ACTIONS_UPDATE_VALUE')
};
