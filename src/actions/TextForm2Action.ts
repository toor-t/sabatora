import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface ITextForm2Actions {
    updateValue: (v: string) => Action<string>;
}

const actionCreator = actionCreatorFactory();

export const TextForm2Actions = {
    updateValue: actionCreator<string>('TEXT_FORM_2_ACTIONS_UPDATE_VALUE')
};
