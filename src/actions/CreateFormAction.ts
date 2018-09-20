'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';

export interface ICreateFormActions {
    selectRow: (r: number) => Action<number>;
    selectCell: (cel: {}) => Action<{}>;
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

const actionCreator = actionCreatorFactory();

export const CreateFormActions = {
    selectRow: actionCreator<number>('CREATE_FORM_ACTIONS_SELECT_ROW'),
    selectCell: actionCreator<{}>('CREATE_FORM_ACTIONS_SELECT_CELL'),
    startEdittingCell: actionCreator<{}>('CREATE_FORM_ACTIONS_START_EDITTING_CELL'),
    updateEdittingCellValue: actionCreator<string>(
        'CREATE_FORM_ACTIONS_UPDATE_EDITTING_CELL_VALUE'
    ),
    endEdittingCell: actionCreator<{}>('CREATE_FORM_ACTIONS_END_EDITTING_CELL'),
    addRow: actionCreator<number>('CREATE_FORM_ACTIONS_ADD_ROW'),
    deleteRow: actionCreator<number>('CREATE_FORM_ACTIONS_DELETE_ROW'),
    insertRow: actionCreator<number>('CREATE_FORM_ACTIONS_INSERT_ROW'),
    startEdittingTitle: actionCreator<void>('CREATE_FORM_ACTIONS_START_EDITTING_TITLE'),
    endEdittingTitle: actionCreator<string>('CREATE_FORM_ACTIONS_END_EDITTING_TITLE'),
    printForm: actionCreator<void>('CREATE_FORM_ACTIONS_PRINT_FORM'),
    saveForm: actionCreator<void>('CREATE_FORM_ACTIONS_SAVE_FORM'),
    loadFrom: actionCreator<void>('CREATE_FORM_ACTIONS_LOAD_FORM')
};
