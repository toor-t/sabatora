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
    });

export const queryDbWorker = wrapThunkAsyncActionWorker<
    { query: db.DataDoc; projection: any[] },
    {},
    {}
>(ManageDataActions.queryDb, queryDb);
