'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface ICreateFormActions {
    selectRow: (r: number) => Action<number>;
    selectCell: (cel: { rowIdx: number; idx: number }) => Action<{}>;
    startEdittingCell: (cel: {}) => Action<{}>;
    updateEdittingCellValue: (v: string) => Action<string>;
    endEdittingCell: (cel: {}) => Action<{}>;
    addRow: (r: number) => Action<number>; // TODO:
    deleteRow: (r: number) => Action<number>; // TODO:
    insertRow: (r: number) => Action<number>; // TODO:
    startEdittingTitle: () => Action<void>;
    endEdittingTitle: (title: string) => Action<string>;
    printForm: () => Action<void>; // TODO:
    saveForm: () => Action<void>; // TODO:
    loadFrom: () => Action<void>; // TODO:
}

const actionCreator = actionCreatorFactory('CREATE_FORM_ACTIONS');

export const CreateFormActions = {
    selectRow: actionCreator<number>('SELECT_ROW'),
    selectCell: actionCreator<{ rowIdx: number; idx: number }>('SELECT_CELL'),
    startEdittingCell: actionCreator<{}>('START_EDITTING_CELL'),
    updateEdittingCellValue: actionCreator<string>('UPDATE_EDITTING_CELL_VALUE'),
    endEdittingCell: actionCreator<{}>('END_EDITTING_CELL'),
    addRow: actionCreator<number>('ADD_ROW'),
    deleteRow: actionCreator<number>('DELETE_ROW'),
    insertRow: actionCreator<number>('INSERT_ROW'),
    startEdittingTitle: actionCreator<void>('START_EDITTING_TITLE'),
    endEdittingTitle: actionCreator<string>('END_EDITTING_TITLE'),
    printForm: actionCreator<void>('PRINT_FORM'),
    saveForm: actionCreator<void>('SAVE_FORM'),
    loadFrom: actionCreator<void>('LOAD_FORM'),

    // TODO:  非同期
    updateAutoCompleteOptions: actionCreator.async<{ rowIdx: number; idx: number }, []>(
        'UPDATE_AUTO_COMPLETE_OPTIONS'
    )
};
