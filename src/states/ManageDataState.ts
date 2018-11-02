/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';
import * as db from '../db';
import wrapAsyncWorker, { wrapThunkAsyncActionWorker } from '../wrapAsyncWorker';
import { queryDb, updateDb } from '../db_renderer';
import immutabilityHelper from 'immutability-helper';

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
    dbDataRows: DBDataRow[] | null;
}
const initialState: IManageDataState = {
    dbDataRows: null
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
    .case(ManageDataActions.updateGridRow, (state, e) => {
        // TODO:
        if (state.dbDataRows === null) {
            return state;
        }
        const dataRows = state.dbDataRows.slice();

        // tslint:disable-next-line:no-increment-decrement
        for (let i = e.fromRow; i <= e.toRow; i++) {
            if (e.updated[DBDataRowKeys.unitPrice_1]) {
                e.updated[DBDataRowKeys.unitPrice_1] = String(
                    e.updated[DBDataRowKeys.unitPrice_1]
                ).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
                    return String.fromCharCode(s.charCodeAt(0) - 65248);
                });
            }
            if (e.updated[DBDataRowKeys.unitPrice_2]) {
                e.updated[DBDataRowKeys.unitPrice_2] = String(
                    e.updated[DBDataRowKeys.unitPrice_2]
                ).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
                    return String.fromCharCode(s.charCodeAt(0) - 65248);
                });
            }
            if (e.updated[DBDataRowKeys.unitPrice_3]) {
                e.updated[DBDataRowKeys.unitPrice_3] = String(
                    e.updated[DBDataRowKeys.unitPrice_3]
                ).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
                    return String.fromCharCode(s.charCodeAt(0) - 65248);
                });
            }
            const updatedRow = immutabilityHelper(dataRows[i], { $merge: e.updated });
            // TODO: 実験 データベースアップデート
            const update = Object.assign({}, updatedRow, {
                [db.DataDocKeys.unitPrice]: [
                    updatedRow[DBDataRowKeys.unitPrice_1],
                    updatedRow[DBDataRowKeys.unitPrice_2],
                    updatedRow[DBDataRowKeys.unitPrice_3]
                ]
            });
            updateDb(dataRows[i], update).then(); // TODO: エラー処理等必要！
            // TODO: 実験終わり
            dataRows[i] = Object.assign({}, updatedRow, {
                [db.DataDocKeys.unitPrice]: [
                    updatedRow[DBDataRowKeys.unitPrice_1],
                    updatedRow[DBDataRowKeys.unitPrice_2],
                    updatedRow[DBDataRowKeys.unitPrice_3]
                ]
            });

            // TODO: データベースアップデート
        }

        // TODO: 編集済みフラグセット
        // const formDataEditted = true;

        return Object.assign({}, state, { dbDataRows: dataRows });
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
        const dbDocs = payload.result as db.DataDoc[];
        const dbDataRows = dbDocs.map<DBDataRow>((value, index, array) => {
            const unitPrice_1 = value[db.DataDocKeys.unitPrice][0];
            const unitPrice_2 = value[db.DataDocKeys.unitPrice][1];
            const unitPrice_3 = value[db.DataDocKeys.unitPrice][2];
            return Object.assign(
                {},
                value,
                {
                    [DBDataRowKeys.unitPrice_1]: unitPrice_1,
                    [DBDataRowKeys.unitPrice_2]: unitPrice_2,
                    [DBDataRowKeys.unitPrice_3]: unitPrice_3
                },
                { id: index }
            );
        });

        return Object.assign({}, state, { dbDataRows });
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
