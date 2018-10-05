//
// CreateFormAction
//
'use strict';
import { Action, actionCreatorFactory } from 'typescript-fsa';
import * as ReactDataGrid from 'react-data-grid';
import { FormDataRow, TotalPriceRow, SubtotalPriceRow } from '../states/CreateFormState';

export interface ICreateFormActions {
    // 行選択
    selectRows: (
        rows: { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    ) => Action<{ rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]>;
    // 行選択解除
    deselectRows: (
        rows: { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    ) => Action<{ rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]>;
    // セル選択
    selectCell: (cel: { rowIdx: number; idx: number }) => Action<{}>;
    // 行追加
    addRow: () => Action<void>; // TODO:
    // 小計行追加
    addSubtotalRow: () => Action<void>; // TODO:
    // 選択行削除
    deleteRows: () => Action<void>;
    // insertRow: (r: number) => Action<number>; // TODO:
    // 行更新
    updateGridRow: (
        e: ReactDataGrid.GridRowsUpdatedEvent
    ) => Action<ReactDataGrid.GridRowsUpdatedEvent>;

    // TODO: タイトル編集開始
    startEdittingTitle: () => Action<void>;
    // TODO: タイトル編集終了
    endEdittingTitle: (title: string) => Action<string>;

    // AutoComplete候補更新
    updateAutoCompleteOptions: any;

    printForm: () => Action<void>; // TODO:
    saveForm: () => Action<void>; // TODO:
    loadFrom: () => Action<void>; // TODO:
}

const actionCreator = actionCreatorFactory('CREATE_FORM_ACTIONS');

export const CreateFormActions = {
    selectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('SELECT_ROWS'),
    deselectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('DESELECT_ROWS'),
    selectCell: actionCreator<{ rowIdx: number; idx: number }>('SELECT_CELL'),
    addRow: actionCreator<void>('ADD_ROW'),
    addSubtotalRow: actionCreator<void>('ADD_SUBTOTAL_ROW'),
    deleteRows: actionCreator<void>('DELETE_ROW'),
    // insertRow: actionCreator<number>('INSERT_ROW'),
    updateGridRow: actionCreator<ReactDataGrid.GridRowsUpdatedEvent>('UPDATE_GRID_ROW'),

    startEdittingTitle: actionCreator<void>('START_EDITTING_TITLE'),
    endEdittingTitle: actionCreator<string>('END_EDITTING_TITLE'),

    // TODO:  非同期
    updateAutoCompleteOptions: actionCreator.async<
        { rowData: FormDataRow; columnDDKey: string },
        {}
    >('UPDATE_AUTO_COMPLETE_OPTIONS'),

    printForm: actionCreator<void>('PRINT_FORM'),
    saveForm: actionCreator<void>('SAVE_FORM'),
    loadFrom: actionCreator<void>('LOAD_FORM')
};
