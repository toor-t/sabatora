/**
 * CreateFormAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';
import * as ReactDataGrid from 'react-data-grid';
import { NormalDataRow, TotalPriceRow, SubtotalPriceRow } from '../states/CreateFormState';

const actionCreator = actionCreatorFactory('CREATE_FORM_ACTIONS');

/**
 * CreateFormActions
 */
export const CreateFormActions = {
    /**
     * 行選択
     */
    selectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('SELECT_ROWS'),
    /**
     * 行選択解除
     */
    deselectRows: actionCreator<
        { rowIdx: number; row: FormData | TotalPriceRow | SubtotalPriceRow }[]
    >('DESELECT_ROWS'),
    /**
     * セル選択
     */
    selectCell: actionCreator<{ rowIdx: number; idx: number }>('SELECT_CELL'),
    /**
     * 行追加
     */
    addRow: actionCreator<void>('ADD_ROW'),
    /**
     * 小計行追加
     */
    addSubtotalRow: actionCreator<void>('ADD_SUBTOTAL_ROW'),
    /**
     * 行削除
     */
    deleteRows: actionCreator<void>('DELETE_ROW'),
    // insertRow: actionCreator<number>('INSERT_ROW'),
    /**
     * グリッド行更新
     */
    updateGridRow: actionCreator<ReactDataGrid.GridRowsUpdatedEvent>('UPDATE_GRID_ROW'),

    /**
     * タイトル編集開始
     */
    startEdittingTitle: actionCreator<void>('START_EDITTING_TITLE'),
    /**
     * タイトル編集終了
     */
    endEdittingTitle: actionCreator<string>('END_EDITTING_TITLE'),

    /**
     * オートコンプリート候補更新
     */
    updateAutoCompleteOptions: actionCreator.async<
        { rowData: NormalDataRow; columnDDKey: string },
        {}
    >('UPDATE_AUTO_COMPLETE_OPTIONS'),

    /**
     * 帳票印刷
     */
    printForm: actionCreator<void>('PRINT_FORM'),
    /**
     * 帳票保存
     */
    saveForm: actionCreator.async<void, {}, {}>('SAVE_FORM'),
    /**
     * 帳票読込
     */
    openForm: actionCreator.async<void, Buffer, {}>('OPEN_FORM'),

    // TODO:
    /**
     * 通知が閉じられた
     */
    closeNotify: actionCreator<void>('CLOSE_NOTIFY'),
    /**
     * 通知クローズボタンが押された
     */
    clickNotifyCloseButton: actionCreator<void>('CLICK_NOTIFY_CLOSE_BUTTON')
};
