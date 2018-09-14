import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { textFormActions } from '../actions/TextFormAction';

export interface ITextFormState {
    value: string;
}

const initialState: ITextFormState = {
    value: 'こんにちは。'
};

export const textFormStateReducer = reducerWithInitialState<ITextFormState>(initialState).case(
    textFormActions.updateValue,
    (state, value) => {
        return Object.assign({}, state, { value });
    }
);
