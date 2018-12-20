/**
 * CreateFormState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CreateFormActions } from '../actions/CreateFormAction';
import immutabilityHelper from 'immutability-helper';
import {
    wrapThunkAsyncActionWorker,
    wrapThunkAsyncActionParamVoidWorker
} from '../wrapAsyncWorker';
import { updateAutoCompleteOptions } from '../db_renderer';
import { openForm, saveForm, saveForm_sendFormData } from '../file_io_rederer';
// TODO: NotifyComponentの実験
import { NotifyContext } from '../components/NotifyComponent';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../store';
import { printForm } from '../print_renderer';
import { Str, BtnLabel, Message } from '../strings';
import { Action } from 'redux';
import { DataDoc, DataDocKeys } from '../db';

// NormalDataRowKeys
export namespace NormalRowKeys {
    // TODO:
    export const id = 'id'; // : number;
    /**
     * level
     */
    export const level_1 = 'level_1'; // : string; // 大項目
    export const level_2 = 'level_2'; // : string; // 中項目
    export const level_3 = 'level_3'; // : string; // 小項目
    // 現状levelは3段階で固定

    /**
     * itemName
     */
    export const itemName = 'itemName'; // : string; // 名称

    /**
     * unitPrice
     */
    export const unitPrice = 'unitPrice'; // : number; // 単価 TODO: データをどのように持たすか？
    // unitPrice種別は保持していない

    /**
     * num
     */
    export const num = 'num'; // : number; // 個数

    /**
     * price
     */
    export const price = 'price'; // : number; // 価格

    /**
     * selected (行選択フラグ)
     */
    export const selected = 'selected'; // : boolean;

    // TODO: 実験
    export const invalid = 'invalid'; // : boolean;
}
export interface NormalRow {
    /**
     * id (No)
     */
    [NormalRowKeys.id]: number;

    /**
     * level
     */
    [NormalRowKeys.level_1]: string; // 大項目
    [NormalRowKeys.level_2]: string; // 中項目
    [NormalRowKeys.level_3]: string; // 小項目

    /**
     * itemName
     */
    [NormalRowKeys.itemName]: string; // 名称

    /**
     * unitPrice
     */
    [NormalRowKeys.unitPrice]: number; // 単価

    /**
     * num
     */
    [NormalRowKeys.num]: number; // 個数

    /**
     * price
     */
    [NormalRowKeys.price]: number; // 価格

    [NormalRowKeys.selected]: boolean;

    // TODO: 実験
    [NormalRowKeys.invalid]: boolean;
}

// 合計表示行
export namespace TotalPriceRowKeys {
    export const id = 'id'; // TODO: 現状未使用？

    /**
     * Total Price label
     */
    export const labelTotalPrice = 'labelTotalPrice';
    /**
     * Total Price
     */
    export const totalPrice = 'totalPrice';
}
export interface TotalPriceRow {
    [TotalPriceRowKeys.id]: number;

    /**
     * Total Price label
     */
    [TotalPriceRowKeys.labelTotalPrice]: string;
    /**
     * Total Price
     */
    [TotalPriceRowKeys.totalPrice]: number;
}

// 小計表示行
export namespace SubtotalPriceRowKeys {
    export const id = 'id'; // TODO: 現状未使用？

    /**
     * Subtotal Price label
     */
    export const labelSubtotalPrice = 'labelSubtotalPrice';

    /**
     * Subtotal Price
     */
    export const subtotalPrice = 'subtotalPrice';

    /**
     * selected (行選択フラグ)
     */
    export const selected = 'selected';
}
export interface SubtotalPriceRow {
    [SubtotalPriceRowKeys.id]: number;

    /**
     * Subtotal Price label
     */
    [SubtotalPriceRowKeys.labelSubtotalPrice]: string;

    /**
     * Subtotal Price
     */
    [SubtotalPriceRowKeys.subtotalPrice]: number;

    [SubtotalPriceRowKeys.selected]: boolean;
}

export type FormDataRow = NormalRow | SubtotalPriceRow | TotalPriceRow;

/**
 * IFormData
 */
export interface IFormData {
    /**
     * 帳票タイトル
     */
    title: string;

    /**
     * 帳票行データ
     */
    dataRows: FormDataRow[];

    /**
     * TODO: 帳票合計　現状使ってない？
     */
    totalPrice: number;
}

/**
 * ICreateFormState
 */
export interface ICreateFormState {
    /**
     * 帳票データ
     */
    formData: IFormData;

    formDataEditted: boolean; // 帳票データが編集済みか？
    edittingTitle: boolean;

    formDataSelectedRowsCount: number; // TODO:  選択行の数
    formDataFirstSelectedRowIdx: number; // TODO: 先頭から最初の選択行のインデックス

    autoCompleteOptions: {};

    notify: NotifyContext; // 通知コンテキスト

    printing: boolean; //
}
const initialDataRow: FormDataRow = {
    id: 1,

    /**
     * level
     */
    level_1: '',
    level_2: '',
    level_3: '',
    /**
     * itemName
     */
    itemName: '',
    /**
     * unitPrice
     */
    unitPrice: 0,
    /**
     * num
     */
    num: 1, // 初期個数は1に
    /**
     * price
     */
    price: 0,

    selected: false,
    // TODO: 実験
    invalid: false
};
const initialState: ICreateFormState = {
    formData: {
        dataRows: [
            // 空行
            initialDataRow,
            // 合計行
            {
                id: -1,
                [TotalPriceRowKeys.labelTotalPrice]: Str.TotalPrice,
                [TotalPriceRowKeys.totalPrice]: 0
            }
        ],
        title: Str.InitialFormTitle,
        totalPrice: 0
    },
    formDataEditted: false,
    edittingTitle: false,
    formDataSelectedRowsCount: 0,
    formDataFirstSelectedRowIdx: -1,

    autoCompleteOptions: {},

    notify: NotifyContext.emptyNotify(),

    printing: false
};

/**
 * 合計・小計計算
 * @param  {FormDataRow[]} rows
 * @returns number
 */
function calcTotalPrice(rows: FormDataRow[]): number {
    let sumPrice: number = 0;
    let subSumPrice: number = 0;
    let id: number = 1;
    for (let i = 0; i < rows.length; i = i + 1) {
        if (
            NormalRowKeys.price in rows[i]
            // && !rows[i][NormalDataRowKeys.price_isEmpty]
        ) {
            sumPrice += (rows[i] as NormalRow)[NormalRowKeys.price] as number;
            subSumPrice += (rows[i] as NormalRow)[NormalRowKeys.price] as number;
            // TODO: No.を更新する処理
            rows[i][NormalRowKeys.id] = id;
            id += 1;
        }
        // 小計行
        if (SubtotalPriceRowKeys.subtotalPrice in rows[i]) {
            (rows[i] as SubtotalPriceRow)[SubtotalPriceRowKeys.subtotalPrice] = subSumPrice;
            subSumPrice = 0;
        }
        // 合計行 ※ここでやらないほうが良い？
        if (TotalPriceRowKeys.totalPrice in rows[i]) {
            (rows[i] as TotalPriceRow)[TotalPriceRowKeys.totalPrice] = sumPrice;
        }
    }
    // console.log(`totalPrice=${sumPrice}`);
    return sumPrice;
}

/**
 * TODO: 選択行の数と先頭から数えて最初の選択行のインデックスを取得
 * @param rows
 * @returns {count: number; firstIdx: number}
 */
const getSlecetedRowsInfo = (rows: FormDataRow[]): { count: number; firstIdx: number } => {
    let count: number = 0;
    let firstIdx: number = -1;
    for (let idx = 0; idx < rows.length - 1 /* 合計行は無視 */; idx += 1) {
        const row: NormalRow = rows[idx] as NormalRow;
        if (row[NormalRowKeys.selected]) {
            count += 1;
            if (firstIdx === -1) {
                firstIdx = idx;
            }
        }
    }
    return { count, firstIdx };
};

/**
 * CreateFormStateReducer
 */
export const CreateFormStateReducer = reducerWithInitialState<ICreateFormState>(initialState)
    /**
     * 行追加
     */
    .case(CreateFormActions.addRow, state => {
        const dataRows = state.formData.dataRows.slice();
        const rowsCount = dataRows.length;
        let insertIdx = -1;

        if (state.formDataSelectedRowsCount !== 1) {
            // デフォルトは最終行（合計表示行）の一つ前に追加
            insertIdx = rowsCount - 1; // 追加位置のインデックス
        } else if (
            state.formDataFirstSelectedRowIdx > -1 &&
            state.formDataFirstSelectedRowIdx < rowsCount
        ) {
            // 選択行の前に挿入する
            insertIdx = state.formDataFirstSelectedRowIdx; // 挿入する位置のインデックス
        }

        if (insertIdx > -1) {
            // 実際に行を追加・挿入する
            const row = Object.assign({}, initialDataRow, {
                id: rowsCount /* TODO:  これじゃダメ、どうすべき？ */
            });
            dataRows.splice(insertIdx, 0, row);
        } else {
            // 何もせずリターン (通常来ない)
            console.log(`ABNORMAL firstIdx=${state.formDataFirstSelectedRowIdx}`);
            return state;
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);
        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });
        // 編集済みフラグセット
        const formDataEditted = true;
        // 選択行の数等のチェック
        const rowsInfo = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData, formDataEditted },
            {
                formDataSelectedRowsCount: rowsInfo.count,
                formDataFirstSelectedRowIdx: rowsInfo.firstIdx
            }
        );
    })

    /**
     * 小計行追加
     */
    .case(CreateFormActions.addSubtotalRow, state => {
        const dataRows = state.formData.dataRows.slice();
        const rowsCount = dataRows.length;
        let insertIdx = -1;

        if (state.formDataSelectedRowsCount !== 1) {
            // デフォルトは最終行（合計表示行）の一つ前に追加
            insertIdx = rowsCount - 1; // 追加位置のインデックス
        } else if (
            state.formDataFirstSelectedRowIdx > -1 &&
            state.formDataFirstSelectedRowIdx < rowsCount
        ) {
            // 選択行の前に挿入する
            insertIdx = state.formDataFirstSelectedRowIdx; // 挿入する位置のインデックス
        }

        if (insertIdx > -1) {
            // 実際に小計行を追加・挿入する
            const subtotalRow: SubtotalPriceRow = {
                id: -1,
                labelSubtotalPrice: Str.SubtotalPrice,
                subtotalPrice: 0,
                selected: false
            };
            dataRows.splice(insertIdx, 0, subtotalRow);
        } else {
            // 何もせずリターン (通常来ない)
            console.log(`ABNORMAL firstIdx=${state.formDataFirstSelectedRowIdx}`);
            return state;
        }

        // 合計を計算 (ここで追加した小計行の小計も計算される)
        const totalPrice = calcTotalPrice(dataRows);
        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });
        // 編集済みフラグセット
        const formDataEditted = true;
        // 選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    /**
     * 行削除
     */
    .case(CreateFormActions.deleteRows, state => {
        const dataRows: (NormalRow | TotalPriceRow | SubtotalPriceRow)[] = [];

        for (const dataRowIdx in state.formData.dataRows) {
            if (!(state.formData.dataRows[dataRowIdx] as NormalRow)[NormalRowKeys.selected]) {
                // 残す行なのでpushして保存する
                dataRows.push(state.formData.dataRows[dataRowIdx]);
            }
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);
        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });
        // 編集済みフラグセット
        const formDataEditted = true;
        // 選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    /**
     * グリッド行更新
     */
    .case(CreateFormActions.updateGridRow, (state, e) => {
        const dataRows = state.formData.dataRows.slice();

        // tslint:disable-next-line:no-increment-decrement
        for (let i = e.fromRow; i <= e.toRow; i++) {
            if ((dataRows[i] as any)[NormalRowKeys.price] !== undefined) {
                const rowToUpdate: NormalRow = dataRows[i] as NormalRow;
                // TODO: 価格を計算
                if (e.updated[NormalRowKeys.unitPrice]) {
                    e.updated[NormalRowKeys.unitPrice] = String(
                        e.updated[NormalRowKeys.unitPrice]
                    ).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
                        return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                }
                if (e.updated[NormalRowKeys.num]) {
                    e.updated[NormalRowKeys.num] = String(e.updated[NormalRowKeys.num]).replace(
                        /[Ａ-Ｚａ-ｚ０-９]/g,
                        (s: string) => {
                            return String.fromCharCode(s.charCodeAt(0) - 65248);
                        }
                    );
                }
                const _unitPrice = !e.updated[NormalRowKeys.unitPrice]
                    ? rowToUpdate[NormalRowKeys.unitPrice]
                    : e.updated[NormalRowKeys.unitPrice] === ''
                    ? 0
                    : e.updated[NormalRowKeys.unitPrice];
                const _num = !e.updated[NormalRowKeys.num]
                    ? rowToUpdate[NormalRowKeys.num]
                    : e.updated[NormalRowKeys.num] === ''
                    ? 0
                    : e.updated[NormalRowKeys.num];

                e.updated[NormalRowKeys.price] = Number(_unitPrice) * Number(_num);
                // e.updated[NormalDataRowKeys.price_isEmpty] = false;

                const updatedRow = immutabilityHelper(rowToUpdate, { $merge: e.updated });
                dataRows[i] = updatedRow;
            }
        }
        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);
        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });
        // 編集済みフラグセット
        const formDataEditted = true;

        return Object.assign({}, state, { formData, formDataEditted });
    })

    /**
     * 帳票読込 (開始)
     */
    .case(CreateFormActions.openForm.started, state => {
        // TODO:
        return state;
    })
    /**
     * 帳票読込 (完了)
     */
    .case(CreateFormActions.openForm.done, (state, payload) => {
        // TODO: 読みこんだデータのフォーマットチェック等が必要!!
        const loadFormData = JSON.parse(payload.result.toString());
        // console.log(loadFormData);

        // 読み込み完了通知を出す
        const notify = NotifyContext.defaultNotify(
            Message.OpenFormDone,
            CreateFormActions.closeNotify
        );
        // TODO:  選択行の数等のチェック (てか、ロード時は全部解除すべきか？)
        const ret = getSlecetedRowsInfo(loadFormData.dataRows);
        // 編集済みフラグリセット
        const formDataEditted = false;

        return Object.assign(
            {},
            state,
            { formData: loadFormData },
            { notify, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })
    /**
     * 帳票読込 (失敗)
     */
    .case(CreateFormActions.openForm.failed, (state, payload) => {
        // TODO:

        // TODO: キャンセル時
        if (payload.error === 'CANCELED') {
            return state;
        }
        // 読み込み失敗通知
        const notify = NotifyContext.defaultNotify(
            Message.OpenFormFailed,
            CreateFormActions.closeNotify
        );

        return Object.assign({}, state, { notify });
    })

    /**
     * 帳票読込確認
     */
    .case(CreateFormActions.confirmOpenForm, state => {
        // TODO: メッセージの内容確認。及び、メッセージの定義をstrings.tsに移す。
        const notify = new NotifyContext(
            Message.ConfirmOpenForm,
            1,
            true,
            0,
            '',
            BtnLabel.Cancel,
            BtnLabel.Accept,
            undefined,
            undefined,
            CreateFormActions.closeNotify,
            openFormWorker
        );

        return Object.assign({}, state, { notify });
    })

    /**
     * 帳票保存 (開始)
     */
    .case(CreateFormActions.saveForm.started, state => {
        // 現在のFormDataを保存用にmainプロセスに送る
        saveForm_sendFormData(state.formData);

        return state;
    })
    /**
     * 帳票保存 (完了)
     */
    .case(CreateFormActions.saveForm.done, (state, payload) => {
        // 保存完了通知
        const notify = NotifyContext.defaultNotify(
            Message.SaveFormDone,
            CreateFormActions.closeNotify
        );
        // 編集済みフラグリセット
        const formDataEditted = false;

        return Object.assign({}, state, { notify, formDataEditted });
    })
    /**
     * 帳票保存 (失敗)
     */
    .case(CreateFormActions.saveForm.failed, (state, payload) => {
        // TODO:
        // console.log('CreateFormActions.saveForm.failed');
        // TODO: キャンセル時
        if (payload.error === 'CANCELED') {
            return state;
        }
        // 保存失敗通知
        const notify = NotifyContext.defaultNotify(
            Message.SaveFormFailed,
            CreateFormActions.closeNotify
        );

        return Object.assign({}, state, { notify });
    })

    /**
     * 帳票印刷開始
     */
    .case(CreateFormActions.startPrintForm, state => {
        // TODO: プリント用画面に切り替える
        const printing = true;
        return Object.assign({}, state, { printing });
    })
    /**
     * 帳票印刷終了
     */
    .case(CreateFormActions.endPrintForm, state => {
        // TODO: プリント用画面を終了
        const printing = false;
        return Object.assign({}, state, { printing });
    })

    /**
     * 新規帳票作成
     */
    .case(CreateFormActions.newForm, (state /*, force*/) => {
        // TODO: 初期データを復元する
        const formData = initialState.formData;
        // 編集状態解除
        const formDataEditted = false;
        // 確認ダイアログが表示されているなら消す
        // TODO:
        const notify = state.notify.open ? state.notify.closedNotify() : state.notify;

        return Object.assign({}, state, { formData, formDataEditted }, { notify });
    })
    /**
     * 新規帳票作成確認
     */
    .case(CreateFormActions.confirmNewForm, state => {
        // TODO:
        const notify = new NotifyContext(
            Message.ConfirmNewForm,
            1,
            true,
            0,
            '',
            BtnLabel.Cancel,
            BtnLabel.Accept,
            undefined,
            undefined,
            CreateFormActions.closeNotify,
            CreateFormActions.newForm
        );

        return Object.assign({}, state, { notify });
    })

    /**
     * セル選択
     */
    .case(CreateFormActions.selectCell, (state, col) => {
        // TODO:
        return Object.assign({}, state, { sellectedCell: col });
    })

    /**
     * 行選択
     */
    .case(CreateFormActions.selectRows, (state, rows) => {
        // TODO:
        const dataRows = state.formData.dataRows.map((value, index, array) => {
            if ((value as TotalPriceRow)[TotalPriceRowKeys.totalPrice] === undefined) {
                // 合計表示行は選択不能にする
                for (let i = 0; i < rows.length; i = i + 1) {
                    if (index === rows[i].rowIdx) {
                        // 選択された
                        return Object.assign({}, array[index], { selected: true });
                    }
                }
            }
            // 選択されてない
            return Object.assign({}, array[index]);
        });

        const formData = Object.assign({}, state.formData, { dataRows });

        // TODO:  選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    /**
     * 行選択解除
     */
    .case(CreateFormActions.deselectRows, (state, rows) => {
        // TODO:
        const dataRows = state.formData.dataRows.map((value, index, array) => {
            for (let i = 0; i < rows.length; i = i + 1) {
                if (index === rows[i].rowIdx) {
                    // 選択解除された
                    return Object.assign({}, array[index], { selected: false });
                }
            }
            // 選択解除されてない
            return Object.assign({}, array[index]);
        });

        const formData = Object.assign({}, state.formData, { dataRows });

        // TODO:  選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    /**
     * タイトル編集開始
     */
    .case(CreateFormActions.startEdittingTitle, state => {
        return Object.assign({}, state, { edittingTitle: true });
    })

    /**
     * タイトル編集終了
     */
    .case(CreateFormActions.endEdittingTitle, (state, title) => {
        const formData = Object.assign({}, state.formData, { title });
        // 編集済みフラグセット
        const formDataEditted = true;

        return Object.assign({}, state, { formData, formDataEditted }, { edittingTitle: false });
    })

    /**
     * AutoCompleteOptions更新 (開始)
     */
    .case(CreateFormActions.updateAutoCompleteOptions.started, (state, cell) => {
        // TODO:
        return state;
    })
    /**
     * AutoCompleteOptions更新 (完了)
     */
    .case(CreateFormActions.updateAutoCompleteOptions.done, (state, done) => {
        // TODO:
        return Object.assign({}, state, { autoCompleteOptions: done.result });
    })
    /**
     * AutoCompleteOptions更新 (失敗)
     */
    .case(CreateFormActions.updateAutoCompleteOptions.failed, (state, error) => {
        // TODO:
        return state;
    })

    /**
     * TODO: 通知が閉じられた
     */
    .case(CreateFormActions.closeNotify, state => {
        // TODO:
        const notify = state.notify.closedNotify();
        return Object.assign({}, state, { notify });
    })
    /**
     * TODO: 通知のクローズボタンがクリックされた
     */
    .case(CreateFormActions.clickNotifyCloseButton, state => {
        // TODO:
        const notify = state.notify.closedNotify();
        return Object.assign({}, state, { notify });
    });

/**
 * 非同期でautoCompleteOptionsを更新する
 */
export const updateAutoCompleteOptionsWorker = wrapThunkAsyncActionWorker<
    IAppState,
    { rowData: NormalRow; columnDDKey?: string },
    {},
    {}
>(
    CreateFormActions.updateAutoCompleteOptions,
    ({ rowData, columnDDKey }): Promise<{}> => {
        let _rowData: DataDoc = Object.assign(
            {},
            {
                /**
                 * level
                 */
                [DataDocKeys.level_1]: rowData[NormalRowKeys.level_1],
                [DataDocKeys.level_2]: rowData[NormalRowKeys.level_2],
                [DataDocKeys.level_3]: rowData[NormalRowKeys.level_3],
                /**
                 * itemName
                 */
                [DataDocKeys.itemName]: rowData[NormalRowKeys.itemName],
                /**
                 * unitPrice
                 */
                [DataDocKeys.unitPrice]: [
                    0 // TODO: unitPrice はクエリに使われないのでダミー
                ]
            }
        );
        if (columnDDKey) {
            _rowData = Object.assign(_rowData, {
                [columnDDKey]: undefined
            });
        }
        return updateAutoCompleteOptions(_rowData);
    }
);

/**
 * TODO: 非同期帳票読込
 */
export const openFormWorker = wrapThunkAsyncActionParamVoidWorker<IAppState, Buffer, string>(
    CreateFormActions.openForm,
    openForm
);

/**
 * TODO: 非同期帳票保存
 */
export const saveFormWorker = wrapThunkAsyncActionParamVoidWorker<IAppState, void, string>(
    CreateFormActions.saveForm,
    saveForm
);

/**
 * TODO: 確認付き帳票読込 ※ここに置くべきか？要検討
 */
export const openFormWithConfirmWorker = () => (
    dispatch: ThunkDispatch<IAppState, undefined, Action>,
    getState: () => IAppState
) => {
    const { formDataEditted } = getState().createFormState;

    if (formDataEditted) {
        // 編集済みのため、読込前にユーザ確認する
        dispatch(CreateFormActions.confirmOpenForm());
    } else {
        // 未編集なのでこのまま読込処理へ
        dispatch(openFormWorker());
    }
};

/**
 * TODO: 確認付き新規帳票作成 ※ここに置くべきか？要検討
 */
export const newFormWithConfirmWorker = () => (
    dispatch: ThunkDispatch<IAppState, undefined, Action>,
    getState: () => IAppState
) => {
    const { formDataEditted } = getState().createFormState;

    if (formDataEditted) {
        // 編集済みのため、新規作成前にユーザ確認する
        dispatch(CreateFormActions.confirmNewForm());
    } else {
        // 未編集なのでこのまま新規帳票作成処理へ
        dispatch(CreateFormActions.newForm());
    }
};

/**
 * TODO: 印刷処理ワーカー
 */
export const printFormWorker = () => (
    dispatch: ThunkDispatch<IAppState, undefined, Action>,
    getState: () => IAppState
) => {
    // 印刷開始
    dispatch(CreateFormActions.startPrintForm());
    return printForm().then(
        result => {
            console.log('印刷終了');
            // 印刷終了
            dispatch(CreateFormActions.endPrintForm());
            return result;
        },
        error => {
            // TODO:  失敗した場合エラー表示する
            console.log('帳票印刷失敗');
            dispatch(CreateFormActions.endPrintForm());
            // throw error;
            return error;
        }
    );
};
