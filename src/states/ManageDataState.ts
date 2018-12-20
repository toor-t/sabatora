/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';
import * as db from '../db';
import { wrapThunkAsyncActionWorker } from '../wrapAsyncWorker';
import { queryDb, updateDb, insertDb, removeDb } from '../db_renderer';
import immutabilityHelper from 'immutability-helper';
import { IAppState } from '../store';
import { Str } from '../strings';

// DBDataRowKeys
export namespace DBDataRowKeys {
    // TODO:
    export const _id = '_id';

    export const level_1 = db.DataDocKeys.level_1;
    export const level_2 = db.DataDocKeys.level_2;
    export const level_3 = db.DataDocKeys.level_3;
    export const itemName = db.DataDocKeys.itemName;
    export const unitPrice_1 = 'unitPrice_1';
    export const unitPrice_2 = 'unitPrice_2';
    export const unitPrice_3 = 'unitPrice_3';

    export const selected = 'selected';
}

export interface DBDataRow {
    [DBDataRowKeys._id]?: string;

    [DBDataRowKeys.level_1]: string;
    [DBDataRowKeys.level_2]: string;
    [DBDataRowKeys.level_3]: string;
    [DBDataRowKeys.itemName]: string;
    [DBDataRowKeys.unitPrice_1]: number;
    [DBDataRowKeys.unitPrice_2]: number;
    [DBDataRowKeys.unitPrice_3]: number;

    [DBDataRowKeys.selected]: boolean;
}

/**
 * IManageDataState
 */
export interface IManageDataState {
    dbDataRows: DBDataRow[] | null;
    selectedRowsCount: number; // TODO:  選択行の数
}
const initialState: IManageDataState = {
    dbDataRows: null,
    selectedRowsCount: 0
};

/**
 * TODO: 選択行の数を取得
 * @param rows
 * @returns number
 */
const getSlecetedRowsCount = (rows: DBDataRow[]): number => {
    let count: number = 0;
    for (let idx = 0; idx < rows.length; idx += 1) {
        const row = rows[idx];
        if (row[DBDataRowKeys.selected]) {
            count += 1;
        }
    }
    // console.log(`count=${count}`);
    return count;
};

/**
 * ManageDataStateReducer
 */
export const ManageDataStateReducer = reducerWithInitialState<IManageDataState>(initialState)
    /**
     * 行選択
     */
    .case(ManageDataActions.selectRows, (state, rows) => {
        // TODO:
        if (state.dbDataRows === null) {
            return state;
        }
        const dbDataRows = state.dbDataRows.map((value, index, array) => {
            for (let i = 0; i < rows.length; i = i + 1) {
                if (index === rows[i].rowIdx) {
                    // 選択された
                    return Object.assign({}, array[index], { selected: true });
                }
            }
            // 選択されてない
            return Object.assign({}, array[index]);
        });

        // TODO:  選択行の数チェック
        const selectedRowsCount = getSlecetedRowsCount(dbDataRows);

        return Object.assign({}, state, { dbDataRows, selectedRowsCount });
    })

    /**
     * 行選択解除
     */
    .case(ManageDataActions.deselectRows, (state, rows) => {
        // TODO:
        if (state.dbDataRows === null) {
            return state;
        }
        const dbDataRows = state.dbDataRows.map((value, index, array) => {
            for (let i = 0; i < rows.length; i = i + 1) {
                if (index === rows[i].rowIdx) {
                    // 選択解除された
                    return Object.assign({}, array[index], { selected: false });
                }
            }
            // 選択解除されてない
            return Object.assign({}, array[index]);
        });

        // TODO:  選択行の数等のチェック
        const selectedRowsCount = getSlecetedRowsCount(dbDataRows);

        return Object.assign({}, state, { dbDataRows, selectedRowsCount });
    })

    /**
     * セル選択
     */
    .case(ManageDataActions.selectCell, (state, payload) => {
        // TODO:
        return state;
    })

    /**
     * 行追加
     */
    .case(ManageDataActions.addRow, state => {
        if (state.dbDataRows === null) {
            return state;
        }
        // TODO:　先頭に追加する
        const insertRow: DBDataRow = {
            [DBDataRowKeys.level_1]: Str.Level_1_NewItem,
            [DBDataRowKeys.level_2]: Str.Level_2_NewItem,
            [DBDataRowKeys.level_3]: Str.Level_3_NewItem,
            [DBDataRowKeys.itemName]: Str.ItemName_NewItem,
            [DBDataRowKeys.unitPrice_1]: 0,
            [DBDataRowKeys.unitPrice_2]: 0,
            [DBDataRowKeys.unitPrice_3]: 0,

            [DBDataRowKeys.selected]: false
        };
        const dbDataRows = state.dbDataRows.slice();
        dbDataRows.unshift(insertRow);
        // TODO: DBに追加
        const insertDoc: db.DataDoc = Object.assign(
            {},
            {
                [db.DataDocKeys.level_1]: insertRow[DBDataRowKeys.level_1],
                [db.DataDocKeys.level_2]: insertRow[DBDataRowKeys.level_2],
                [db.DataDocKeys.level_3]: insertRow[DBDataRowKeys.level_3],
                [db.DataDocKeys.itemName]: insertRow[DBDataRowKeys.itemName],
                [db.DataDocKeys.unitPrice]: [
                    insertRow[DBDataRowKeys.unitPrice_1],
                    insertRow[DBDataRowKeys.unitPrice_2],
                    insertRow[DBDataRowKeys.unitPrice_3]
                ]
            }
        );

        insertDb(insertDoc).then();

        return Object.assign({}, state, { dbDataRows });
    })

    /**
     * 行削除
     */
    .case(ManageDataActions.deleteRows, state => {
        // TODO:
        if (state.dbDataRows === null) {
            return state;
        }
        const dbDataRows: DBDataRow[] = [];

        for (const dbDataRowIdx in state.dbDataRows) {
            if (!state.dbDataRows[dbDataRowIdx][DBDataRowKeys.selected]) {
                // 残す行
                dbDataRows.push(state.dbDataRows[dbDataRowIdx]);
            } else {
                // 消す行
                // TODO: DBから削除する
                const removeQuery: db.DataDoc = Object.assign(
                    {},
                    {
                        [db.DataDocKeys.level_1]:
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.level_1],
                        [db.DataDocKeys.level_2]:
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.level_2],
                        [db.DataDocKeys.level_3]:
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.level_3],
                        [db.DataDocKeys.itemName]:
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.itemName],
                        [db.DataDocKeys.unitPrice]: [
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.unitPrice_1],
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.unitPrice_2],
                            state.dbDataRows[dbDataRowIdx][DBDataRowKeys.unitPrice_3]
                        ]
                    }
                );
                removeDb(removeQuery).then();
            }
        }

        // TODO:  選択行の数等のチェック
        const selectedRowsCount = getSlecetedRowsCount(dbDataRows);

        return Object.assign({}, state, { dbDataRows, selectedRowsCount });
    })

    /**
     * グリッド行更新
     */
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
            // TODO: データベースアップデート
            const update: db.DataDoc = Object.assign(
                {},
                {
                    [db.DataDocKeys.level_1]: updatedRow[DBDataRowKeys.level_1],
                    [db.DataDocKeys.level_2]: updatedRow[DBDataRowKeys.level_2],
                    [db.DataDocKeys.level_3]: updatedRow[DBDataRowKeys.level_3],
                    [db.DataDocKeys.itemName]: updatedRow[DBDataRowKeys.itemName],
                    [db.DataDocKeys.unitPrice]: [
                        updatedRow[DBDataRowKeys.unitPrice_1],
                        updatedRow[DBDataRowKeys.unitPrice_2],
                        updatedRow[DBDataRowKeys.unitPrice_3]
                    ]
                }
            );
            const dataDoc: db.DataDoc = Object.assign(
                {},
                {
                    [db.DataDocKeys.level_1]: dataRows[i][DBDataRowKeys.level_1],
                    [db.DataDocKeys.level_2]: dataRows[i][DBDataRowKeys.level_2],
                    [db.DataDocKeys.level_3]: dataRows[i][DBDataRowKeys.level_3],
                    [db.DataDocKeys.itemName]: dataRows[i][DBDataRowKeys.itemName],
                    [db.DataDocKeys.unitPrice]: [
                        dataRows[i][DBDataRowKeys.unitPrice_1],
                        dataRows[i][DBDataRowKeys.unitPrice_2],
                        dataRows[i][DBDataRowKeys.unitPrice_3]
                    ]
                }
            );
            updateDb(dataDoc, update).then(); // TODO: エラー処理等必要！

            dataRows[i] = Object.assign({}, updatedRow, {
                [db.DataDocKeys.unitPrice]: [
                    updatedRow[DBDataRowKeys.unitPrice_1],
                    updatedRow[DBDataRowKeys.unitPrice_2],
                    updatedRow[DBDataRowKeys.unitPrice_3]
                ]
            });
        }

        return Object.assign({}, state, { dbDataRows: dataRows });
    })

    /**
     * デーベースクエリー (開始)
     */
    .case(ManageDataActions.queryDb.started, (state, param) => {
        // TODO:
        return state;
    })
    /**
     * データベースクエリー (完了)
     */
    .case(ManageDataActions.queryDb.done, (state, payload) => {
        // TODO:
        const dbDocs = payload.result;
        const dbDataRows = dbDocs.map((value, index, array) => {
            const unitPriceArray = value[db.DataDocKeys.unitPrice];
            return Object.assign(
                {},
                value,
                {
                    [DBDataRowKeys.unitPrice_1]: unitPriceArray[0],
                    [DBDataRowKeys.unitPrice_2]: unitPriceArray[1],
                    [DBDataRowKeys.unitPrice_3]: unitPriceArray[2]
                },
                { [DBDataRowKeys.selected]: false }
            );
        });

        return Object.assign({}, state, { dbDataRows });
    })
    /**
     * データベースクエリー (失敗)
     */
    .case(ManageDataActions.queryDb.failed, (state, payload) => {
        // TODO:
        console.log('ManageDataActions.queryDb.failed');
        return state;
    })

    /**
     * データベースバックアップ (開始)
     */
    .case(ManageDataActions.backupDb.started, state => {
        // TODO:
        return state;
    })
    /**
     * データベースバックアップ (完了)
     */
    .case(ManageDataActions.backupDb.done, (state, payload) => {
        // TODO:
        return state;
    })
    /**
     * データベースバックアップ (失敗)
     */
    .case(ManageDataActions.backupDb.failed, (state, payload) => {
        // TODO:
        return state;
    })

    /**
     * データベースリストア (開始)
     */
    .case(ManageDataActions.restoreDb.started, state => {
        // TODO:
        return state;
    })
    /**
     * データベースリストア (完了)
     */
    .case(ManageDataActions.restoreDb.done, (state, payload) => {
        // TODO:
        return state;
    })
    /**
     * データベースリストア (失敗)
     */
    .case(ManageDataActions.restoreDb.failed, (state, payload) => {
        // TODO:
        return state;
    })

    /**
     * 通知が閉じられた
     */
    .case(ManageDataActions.closeNotify, state => {
        // TODO:
        return state;
    })
    /**
     * 通知クローズボタンが押された
     */
    .case(ManageDataActions.clickNotifyCloseButton, state => {
        // TODO:
        return state;
    });

/**
 * Query DB Worker
 */
export const queryDbWorker = wrapThunkAsyncActionWorker<
    IAppState,
    { query: db.DataDoc; projection: (keyof db.DataDoc)[] },
    db.DataDoc[],
    string
>(ManageDataActions.queryDb, (params: { query: db.DataDoc; projection: (keyof db.DataDoc)[] }) => {
    return queryDb(params.query, params.projection);
});
