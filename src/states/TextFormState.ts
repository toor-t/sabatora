import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TextFormActions } from '../actions/TextFormAction';
import { CheckBoxActions } from '../actions/CheckBoxAction';

export interface ITextFormState {
    value: string;
}

const initialState: ITextFormState = {
    value: 'こんにちは。'
};

export const TextFormStateReducer = reducerWithInitialState<ITextFormState>(initialState)
    .case(TextFormActions.updateValue, (state, value) => {
        return Object.assign({}, state, { value });
    })
    .case(CheckBoxActions.updateValue, (state, value) => {
        return Object.assign({}, state, { value: '' });
    });
