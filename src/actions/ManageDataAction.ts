/**
 * ManageDataAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';
import * as ReactDataGrid from 'react-data-grid';
import * as ManageDataState from '../states/ManageDataState';
import * as db from '../db';
const actionCreator = actionCreatorFactory('MANAGE_DATA');

/**
 * ManageDataActions
 */
export const ManageDataActions = {
    /**
     * 行選択
     */
    selectRows: actionCreator<{ rowIdx: number; row: ManageDataState.DBDataRow }[]>('SELECT_ROWS'),
    /**
     * 行選択解除
     */
    deselectRows: actionCreator<{ rowIdx: number; row: ManageDataState.DBDataRow }[]>(
        'DESELECT_ROWS'
    ),
    /**
     * セル選択
     */
    selectCell: actionCreator<{ rowIdx: number; idx: number }>('SELECT_CELL'),
    /**
     * 行追加
     */
    addRow: actionCreator<void>('ADD_ROW'),
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
     * データベースクエリー
     */
    queryDb: actionCreator.async<{ query: db.DataDoc; projection: any[] }, {}, {}>('QUERY_DB'),

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
