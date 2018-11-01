/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';
import * as db from '../db';
import wrapAsyncWorker, { wrapThunkAsyncActionWorker } from '../wrapAsyncWorker';
import { queryDb } from '../db_renderer';

// DBDataRowKeys
export namespace DBDataRowKeys {
    // TODO:
    export const id = 'id'; // : number;

    export const level_1 = db.DataDocKeys.level_1;
    export const level_2 = db.DataDocKeys.level_2;
    export const level_3 = db.DataDocKeys.level_3;
    export const itemName = db.DataDocKeys.itemName;
    export const unitPrice_1 = 'unitPrice_1';
    export const unitPrice_2 = 'unitPrice_2';
    export const unitPrice_3 = 'unitPrice_3';
}

export interface DBDataRow {
    [DBDataRowKeys.id]: number;
    [DBDataRowKeys.level_1]: string;
    [DBDataRowKeys.level_2]: string;
    [DBDataRowKeys.level_3]: string;
    [DBDataRowKeys.itemName]: string;
    [DBDataRowKeys.unitPrice_1]: number;
    [DBDataRowKeys.unitPrice_2]: number;
    [DBDataRowKeys.unitPrice_3]: number;
}

/**
 * IManageDataState
 */
export interface IManageDataState {
    dbDataRows: db.DataDoc[];
}
const initialState: IManageDataState = {
    dbDataRows: []
};

/**
 * ManageDataStateReducer
 */
export const ManageDataStateReducer = reducerWithInitialState<IManageDataState>(initialState)
    // 行選択
    .case(ManageDataActions.selectRows, (state, payload) => {
        // TODO:
        return state;
    })
    // 行選択解除
    .case(ManageDataActions.deselectRows, (state, payload) => {
        // TODO:
        return state;
    })
    // セル選択
    .case(ManageDataActions.selectCell, (state, payload) => {
        // TODO:
        return state;
    })
    // 行追加
    .case(ManageDataActions.addRow, state => {
        // TODO:
        return state;
    })
    // 行削除
    .case(ManageDataActions.deleteRows, state => {
        // TODO:
        return state;
    })
    // グリッド行更新
    .case(ManageDataActions.updateGridRow, (state, payload) => {
        // TODO:
        return state;
    })
    // デーベースクエリー (開始)
    .case(ManageDataActions.queryDb.started, (state, param) => {
        // TODO:
        console.log('ManageDataActions.queryDb.started');
        return state;
    })
    // データベースクエリー (完了)
    .case(ManageDataActions.queryDb.done, (state, payload) => {
        // TODO:
        console.log('ManageDataActions.queryDb.done');
        return Object.assign({}, state, { dbDataRows: payload.result });
    })
    // データベースクエリー (失敗)
    .case(ManageDataActions.queryDb.failed, (state, payload) => {
        // TODO:
        console.log('ManageDataActions.queryDb.failed');
        return state;
    })
    // データベースバックアップ (開始)
    .case(ManageDataActions.backupDb.started, state => {
        // TODO:
        return state;
    })
    // データベースバックアップ (完了)
    .case(ManageDataActions.backupDb.done, (state, payload) => {
        // TODO:
        return state;
    })
    // データベースバックアップ (失敗)
    .case(ManageDataActions.backupDb.failed, (state, payload) => {
        // TODO:
        return state;
    })
    // データベースリストア (開始)
    .case(ManageDataActions.restoreDb.started, state => {
        // TODO:
        return state;
    })
    // データベースリストア (完了)
    .case(ManageDataActions.restoreDb.done, (state, payload) => {
        // TODO:
        return state;
    })
    // データベースリストア (失敗)
    .case(ManageDataActions.restoreDb.failed, (state, payload) => {
        // TODO:
        return state;
    })
    // 通知が閉じられた
    .case(ManageDataActions.closeNotify, state => {
        // TODO:
        return state;
    })
    // 通知クローズボタンが押された
    .case(ManageDataActions.clickNotifyCloseButton, state => {
        // TODO:
        return state;
    });

export const queryDbWorker = wrapThunkAsyncActionWorker<
    { query: db.DataDoc; projection: any[] },
    {},
    {}
>(ManageDataActions.queryDb, queryDb);
