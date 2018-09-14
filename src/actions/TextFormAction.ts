import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface ITextFormActions {
    updateValue: (v: string) => Action<string>;
}

const actionCreator = actionCreatorFactory();

export const textFormActions = {
    updateValue: actionCreator<string>('TEXT_FORM_ACTIONS_UPDATE_VALUE')
};
