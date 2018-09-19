'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { JikkenActions } from '../actions/__JikkenAction';

export interface IJikkenState {
	state: any;
}

const initialState: IJikkenState = {
	state: {}
};

export const JikkenReducer = reducerWithInitialState<IJikkenState>(initialState).case(
	JikkenActions.updateState,
	(state, _state) => {
		return Object.assign({}, state, { state: _state });
	}
);
