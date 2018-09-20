'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CreateFormActions } from '../actions/CreateFormAction';

export interface FormDataRow {
    id: number;

    level_1: string; // 大項目
    level_1_isValid: boolean;
    level_1_isEmpty: boolean;

    level_2: string; // 中項目
    level_2_isValid: boolean;
    level_2_isEmpty: boolean;

    level_3: string; // 小項目
    level_3_isValid: boolean;
    level_3_isEmpty: boolean;

    itemName: string; // 名称
    itemName_isValid: boolean;
    itemName_isEmpty: boolean;

    unitPrice: number; // 単価 TODO: データをどのように持たすか？
    unitPrice_isValid: boolean;
    unitPrice_isEmpty: boolean;

    num: number; // 個数
    num_isValid: boolean;
    num_isEmpty: boolean;

    price: number; // 価格
    price_isEmpty: boolean;

    checked: boolean;
}

// TODO:
export interface ICreateFormState {
    dataRows: FormDataRow[];
    title: string;
    isEditting: boolean;
    edittingCell: { column: number; row: number };
    autoCompleteOptions: {};
    selectedRow: number;
    selectedCell: { column: number; row: number };
    totalPrice: number;
}

// TODO:
const initialState: ICreateFormState = {
    dataRows: [],
    title: 'Untitled',
    isEditting: false,
    edittingCell: { column: -1, row: -1 },
    autoCompleteOptions: {},
    selectedRow: -1,
    selectedCell: { column: -1, row: -1 },
    totalPrice: 0
};

// TODO:
export const CreateFormStateReducer = reducerWithInitialState<ICreateFormState>(initialState)
    .case(CreateFormActions.addRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.deleteRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.endEdittingCell, (state, cell) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.endEdittingTitle, (state, _title) => {
        return Object.assign({}, state, { title: _title });
    })
    .case(CreateFormActions.insertRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.loadFrom, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.printForm, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.saveForm, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.selectCell, (state, cell) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.selectRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.startEdittingCell, (state, cell) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.startEdittingTitle, (state, cell) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.updateEdittingCellValue, (state, value) => {
        // TODO:
        return state;
    });
