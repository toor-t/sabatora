import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CheckBoxActions } from '../actions/CheckBoxAction';

export interface ICheckBoxState {
    value: boolean;
}

const initialState: ICheckBoxState = {
    value: true
};

export const CheckBoxStateReducer = reducerWithInitialState<ICheckBoxState>(initialState).case(
    CheckBoxActions.updateValue,
    (state, value) => {
        return Object.assign({}, state, { value });
    }
);
