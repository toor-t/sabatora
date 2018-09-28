'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';
import { FormDataRow, TotalPriceRow, SubtotalPriceRow } from '../states/CreateFormState';

export interface ICreateFormActions {
    selectRow: (r: number) => Action<number>;
    selectRows: (
        rows: { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    ) => Action<{ rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]>;
    deselectRows: (
        rows: { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    ) => Action<{ rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]>;
    selectCell: (cel: { rowIdx: number; idx: number }) => Action<{}>;
    // startEdittingCell: (cel: {}) => Action<{}>;
    // updateEdittingCellValue: (v: string) => Action<string>;
    // endEdittingCell: (cel: {}) => Action<{}>;
    addRow: () => Action<void>; // TODO:
    deleteRows: () => Action<void>; // TODO:
    insertRow: (r: number) => Action<number>; // TODO:
    updateGridRow: (e: any) => Action<any>; // TODO:

    startEdittingTitle: () => Action<void>;
    endEdittingTitle: (title: string) => Action<string>;

    printForm: () => Action<void>; // TODO:
    saveForm: () => Action<void>; // TODO:
    loadFrom: () => Action<void>; // TODO:

    updateAutoCompleteOptions: any; // TODO:
    addSubtotalRow: () => Action<void>; // TODO:
}

const actionCreator = actionCreatorFactory('CREATE_FORM_ACTIONS');

export const CreateFormActions = {
    selectRow: actionCreator<number>('SELECT_ROW'),
    selectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('SELECT_ROWS'),
    deselectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('DESELECT_ROWS'),
    selectCell: actionCreator<{ rowIdx: number; idx: number }>('SELECT_CELL'),
    // startEdittingCell: actionCreator<{}>('START_EDITTING_CELL'),
    // updateEdittingCellValue: actionCreator<string>('UPDATE_EDITTING_CELL_VALUE'),
    // endEdittingCell: actionCreator<{}>('END_EDITTING_CELL'),
    addRow: actionCreator<void>('ADD_ROW'),
    deleteRows: actionCreator<void>('DELETE_ROW'),
    insertRow: actionCreator<number>('INSERT_ROW'),
    updateGridRow: actionCreator<any>('UPDATE_GRID_ROW'),
    startEdittingTitle: actionCreator<void>('START_EDITTING_TITLE'),
    endEdittingTitle: actionCreator<string>('END_EDITTING_TITLE'),
    printForm: actionCreator<void>('PRINT_FORM'),
    saveForm: actionCreator<void>('SAVE_FORM'),
    loadFrom: actionCreator<void>('LOAD_FORM'),
    // TODO:  非同期
    updateAutoCompleteOptions: actionCreator.async<{ rowData: FormDataRow; idx: number }, {}>(
        'UPDATE_AUTO_COMPLETE_OPTIONS'
    ),
    addSubtotalRow: actionCreator<void>('ADD_SUBTOTAL_ROW')
};
