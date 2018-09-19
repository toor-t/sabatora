'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CheckBoxActions } from '../actions/__CheckBoxAction';

export interface ICheckBoxState {
	checked: boolean;
}

const initialState: ICheckBoxState = {
	checked: true
};

export const CheckBoxStateReducer = reducerWithInitialState<ICheckBoxState>(initialState).case(
	CheckBoxActions.updateValue,
	(state, checked) => {
		return Object.assign({}, state, { checked });
	}
);
