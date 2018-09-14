import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { textForm2Actions } from '../actions/TextForm2Action';

export interface ITextForm2State {
    value: string;
}

const initialState2: ITextForm2State = {
    value: 'さようなら。'
};

export const textForm2StateReducer = reducerWithInitialState<ITextForm2State>(initialState2).case(
    textForm2Actions.updateValue,
    (state, value) => {
        return Object.assign({}, state, { value });
    }
);
