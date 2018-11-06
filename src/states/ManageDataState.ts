/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';
import * as db from '../db';
import wrapAsyncWorker, { wrapThunkAsyncActionWorker } from '../wrapAsyncWorker';
import { queryDb, updateDb, insertDb, removeDb } from '../db_renderer';
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

    export const selected = 'selected';
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

    [DBDataRowKeys.selected]: boolean;
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

        // const formData = Object.assign({}, state.formData, { dataRows });

        // // TODO:  選択行の数等のチェック
        // const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { dbDataRows }
            // { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })
    // 行選択解除
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

        // const formData = Object.assign({}, state.formData, { dataRows });

        // // TODO:  選択行の数等のチェック
        // const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { dbDataRows }
            // { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })
    // セル選択
    .case(ManageDataActions.selectCell, (state, payload) => {
        // TODO:
        return state;
    })
    // 行追加
    .case(ManageDataActions.addRow, state => {
        if (state.dbDataRows === null) {
            return state;
        }
        // TODO:　先頭に追加する
        const insertRow: DBDataRow = {
            [DBDataRowKeys.id]: state.dbDataRows.length, // TODO: 何を割り当てるべきか？
            [DBDataRowKeys.level_1]: '大項目未入力',
            [DBDataRowKeys.level_2]: '中項目未入力',
            [DBDataRowKeys.level_3]: '小項目未入力',
            [DBDataRowKeys.itemName]: '名称未入力',
            [DBDataRowKeys.unitPrice_1]: 0,
            [DBDataRowKeys.unitPrice_2]: 0,
            [DBDataRowKeys.unitPrice_3]: 0,

            [DBDataRowKeys.selected]: false
        };
        const dbDataRows = state.dbDataRows.slice();
        dbDataRows.unshift(insertRow);
        // TODO: 実験 DBに追加
        const insertDoc = Object.assign(
            {},
            insertRow,
            {
                [DBDataRowKeys.id]: undefined,
                [DBDataRowKeys.unitPrice_1]: undefined,
                [DBDataRowKeys.unitPrice_2]: undefined,
                [DBDataRowKeys.unitPrice_3]: undefined,
                [DBDataRowKeys.selected]: undefined
            },
            {
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
    // 行削除
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
                const removeQuery = Object.assign(
                    {},
                    state.dbDataRows[dbDataRowIdx],
                    {
                        [DBDataRowKeys.id]: undefined,
                        [DBDataRowKeys.unitPrice_1]: undefined,
                        [DBDataRowKeys.unitPrice_2]: undefined,
                        [DBDataRowKeys.unitPrice_3]: undefined,
                        [DBDataRowKeys.selected]: undefined
                    },
                    {
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

        // // 合計を計算
        // const totalPrice = calcTotalPrice(dataRows);

        // const formData = Object.assign({}, state.formData, { totalPrice, dataRows });

        // // TODO: 編集済みフラグセット
        // const formDataEditted = true;

        // // TODO:  選択行の数等のチェック
        // const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { dbDataRows }
            // { formData, formDataEditted },
            // { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
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
            const update = Object.assign(
                {},
                updatedRow,
                {
                    [db.DataDocKeys.unitPrice]: [
                        updatedRow[DBDataRowKeys.unitPrice_1],
                        updatedRow[DBDataRowKeys.unitPrice_2],
                        updatedRow[DBDataRowKeys.unitPrice_3]
                    ]
                },
                {
                    [DBDataRowKeys.id]: undefined,
                    [DBDataRowKeys.unitPrice_1]: undefined,
                    [DBDataRowKeys.unitPrice_2]: undefined,
                    [DBDataRowKeys.unitPrice_3]: undefined,
                    [DBDataRowKeys.selected]: undefined
                }
            );
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
                { [DBDataRowKeys.id]: index },
                { [DBDataRowKeys.selected]: false }
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
