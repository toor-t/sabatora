/**
 * CreateFormState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CreateFormActions } from '../actions/CreateFormAction';
import immutabilityHelper from 'immutability-helper';
import wrapAsyncWorker, {
    wrapThunkAsyncActionWorker,
    wrapThunkAsyncActionParamVoidWorker
} from '../wrapAsyncWorker';
import { updateAutoCompleteOptions } from '../db_renderer';
import { openForm, saveForm, saveForm_sendFormData } from '../file_io_rederer';
// TODO: NotifyComponentの実験
import { NotifyContext } from '../components/NotifyComponent';
import { ThunkDispatch } from 'redux-thunk';
import store, { IAppState } from '../store';
import { remote } from 'electron';

// NormalDataRowKeys
export namespace NormalDataRowKeys {
    // TODO:
    export const id = 'id'; // : number;

    export const level_1 = 'level_1'; // : string; // 大項目
    export const level_1_isValid = 'level_1_isValid'; // : boolean;
    export const level_1_isEmpty = 'level_1_isEmpty'; // : boolean;

    export const level_2 = 'level_2'; // : string; // 中項目
    export const level_2_isValid = 'level_2_isValid'; // : boolean;
    export const level_2_isEmpty = 'level_2_isEmpty'; // : boolean;

    export const level_3 = 'level_3'; // : string; // 小項目
    export const level_3_isValid = 'level_3_isValid'; // : boolean;
    export const level_3_isEmpty = 'level_3_isEmpty'; // : boolean;

    export const itemName = 'itemName'; // : string; // 名称
    export const itemName_isValid = 'itemName_isValid'; // : boolean;
    export const itemName_isEmpty = 'itemName_isEmpty'; // : boolean;

    export const unitPrice = 'unitPrice'; // : number; // 単価 TODO: データをどのように持たすか？
    export const unitPrice_isValid = 'unitPrice_isValid'; // : boolean;
    export const unitPrice_isEmpty = 'unitPrice_isEmpty'; // : boolean;

    export const num = 'num'; // : number; // 個数
    export const num_isValid = 'num_isValid'; // : boolean;
    export const num_isEmpty = 'num_isEmpty'; // : boolean;

    export const price = 'price'; // : number; // 価格
    export const price_isEmpty = 'price_isEmpty'; // : boolean;

    export const selected = 'selected'; // : boolean;
}
export interface NormalDataRow {
    [NormalDataRowKeys.id]: number;

    [NormalDataRowKeys.level_1]: string; // 大項目
    [NormalDataRowKeys.level_1_isValid]: boolean;
    [NormalDataRowKeys.level_1_isEmpty]: boolean;

    [NormalDataRowKeys.level_2]: string; // 中項目
    [NormalDataRowKeys.level_2_isValid]: boolean;
    [NormalDataRowKeys.level_2_isEmpty]: boolean;

    [NormalDataRowKeys.level_3]: string; // 小項目
    [NormalDataRowKeys.level_3_isValid]: boolean;
    [NormalDataRowKeys.level_3_isEmpty]: boolean;

    [NormalDataRowKeys.itemName]: string; // 名称
    [NormalDataRowKeys.itemName_isValid]: boolean;
    [NormalDataRowKeys.itemName_isEmpty]: boolean;

    [NormalDataRowKeys.unitPrice]: number; // 単価 TODO: データをどのように持たすか？
    [NormalDataRowKeys.unitPrice_isValid]: boolean;
    [NormalDataRowKeys.unitPrice_isEmpty]: boolean;

    [NormalDataRowKeys.num]: number; // 個数
    [NormalDataRowKeys.num_isValid]: boolean;
    [NormalDataRowKeys.num_isEmpty]: boolean;

    [NormalDataRowKeys.price]: number; // 価格
    [NormalDataRowKeys.price_isEmpty]: boolean;

    [NormalDataRowKeys.selected]: boolean;
}

// 合計表示行
export namespace TotalPriceRowKeys {
    export const id = 'id';
    export const labelTotalPrice = 'labelTotalPrice';
    export const totalPrice = 'totalPrice';
}
export interface TotalPriceRow {
    [TotalPriceRowKeys.id]: number;
    [TotalPriceRowKeys.labelTotalPrice]: string;
    [TotalPriceRowKeys.totalPrice]: number;
}

// 小計表示行
export namespace SubtotalPriceRowKeys {
    export const id = 'id';
    export const labelSubtotalPrice = 'labelSubtotalPrice';
    export const subtotalPrice = 'subtotalPrice';
}
export interface SubtotalPriceRow {
    [SubtotalPriceRowKeys.id]: number;
    [SubtotalPriceRowKeys.labelSubtotalPrice]: string;
    [SubtotalPriceRowKeys.subtotalPrice]: number;
}

export type FormDataRow = NormalDataRow | SubtotalPriceRow | TotalPriceRow;

/**
 * ICreateFormState
 */
export interface ICreateFormState {
    formData: {
        dataRows: FormDataRow[];
        title: string;
        totalPrice: number;
    };
    formDataEditted: boolean; // 帳票データが編集済みか？
    edittingTitle: boolean;

    formDataSelectedRowsCount: number; // TODO:  選択行の数
    formDataFirstSelectedRowIdx: number; // TODO: 先頭から最初の選択行のインデックス

    autoCompleteOptions: {};

    notify: NotifyContext; // 通知コンテキスト

    printing: boolean; //
}
const initialState: ICreateFormState = {
    formData: {
        dataRows: [
            {
                id: 1,
                level_1: '',
                level_1_isValid: false,
                level_1_isEmpty: true,
                level_2: '',
                level_2_isValid: false,
                level_2_isEmpty: true,
                level_3: '',
                level_3_isValid: false,
                level_3_isEmpty: true,
                itemName: '',
                itemName_isEmpty: true,
                itemName_isValid: false,
                unitPrice: 0,
                unitPrice_isEmpty: true,
                unitPrice_isValid: false,
                num: 0,
                num_isEmpty: true,
                num_isValid: false,
                price: 0,
                price_isEmpty: true,
                selected: false
            },
            {
                id: -1,
                [TotalPriceRowKeys.labelTotalPrice]: '合計:',
                [TotalPriceRowKeys.totalPrice]: 0
            }
        ],
        title: '無題',
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
 * @param  {any[]} rows
 * @returns number
 */
function calcTotalPrice(rows: any[]): number {
    let sumPrice: number = 0;
    let subSumPrice: number = 0;
    for (let i = 0; i < rows.length; i = i + 1) {
        if (
            rows[i][NormalDataRowKeys.price] !== undefined &&
            !rows[i][NormalDataRowKeys.price_isEmpty]
        ) {
            sumPrice += rows[i][NormalDataRowKeys.price];
            subSumPrice += rows[i][NormalDataRowKeys.price];
        }
        // 小計行
        if (rows[i][SubtotalPriceRowKeys.subtotalPrice] !== undefined) {
            rows[i][SubtotalPriceRowKeys.subtotalPrice] = subSumPrice;
            subSumPrice = 0;
        }
        // 合計行 ※ここでやらないほうが良い？
        if (rows[i][TotalPriceRowKeys.totalPrice] !== undefined) {
            rows[i][TotalPriceRowKeys.totalPrice] = sumPrice;
        }
    }
    // console.log(`totalPrice=${sumPrice}`);
    return sumPrice;
}

// TODO: 選択行の数と先頭から数えて最初の選択行のインデックスを取得
const getSlecetedRowsInfo = (rows: FormDataRow[]): { count: number; firstIdx: number } => {
    let count: number = 0;
    let firstIdx: number = -1;
    for (let idx = 0; idx < rows.length - 1 /* 合計行は無視 */; idx += 1) {
        const row: NormalDataRow = rows[idx] as NormalDataRow;
        if (row[NormalDataRowKeys.selected]) {
            count += 1;
            if (firstIdx === -1) {
                firstIdx = idx;
            }
        }
    }
    console.log(`count=${count}, firstIdx=${firstIdx}`);
    return { count, firstIdx };
};
/**
 * CreateFormStateReducer
 */
export const CreateFormStateReducer = reducerWithInitialState<ICreateFormState>(initialState)
    // 行追加
    .case(CreateFormActions.addRow, state => {
        // TODO:
        // console.log('addRow');
        const dataRows = state.formData.dataRows.slice();
        const rowsCount = dataRows.length;
        let insertIdx = -1;
        // TODO:
        if (state.formDataSelectedRowsCount !== 1) {
            // デフォルトは最終行（合計表示行）の一つ前に追加
            insertIdx = rowsCount - 1;
        } else if (
            state.formDataFirstSelectedRowIdx > -1 &&
            state.formDataFirstSelectedRowIdx < rowsCount
        ) {
            // TODO: 選択行の前に挿入する
            insertIdx = state.formDataFirstSelectedRowIdx;
        }

        if (insertIdx > -1) {
            dataRows.splice(insertIdx, 0, {
                id: rowsCount, // TODO:  これじゃダメ、どうすべき？
                level_1: '',
                level_1_isEmpty: true,
                level_1_isValid: false,
                level_2: '',
                level_2_isEmpty: true,
                level_2_isValid: false,
                level_3: '',
                level_3_isEmpty: true,
                level_3_isValid: false,
                itemName: '',
                itemName_isEmpty: true,
                itemName_isValid: false,
                unitPrice: 0,
                unitPrice_isEmpty: true,
                unitPrice_isValid: false,
                num: 0,
                num_isEmpty: true,
                num_isValid: false,
                price: 0,
                price_isEmpty: true,
                selected: false
            });
        } else {
            // 何もせずリターン (通常来ない)
            console.log(`ABNORMAL firstIdx=${state.formDataFirstSelectedRowIdx}`);
            return state;
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);

        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });

        // TODO: 編集済みフラグセット
        const formDataEditted = true;

        // TODO:  選択行の数等のチェック
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

    // 小計行追加
    .case(CreateFormActions.addSubtotalRow, state => {
        // TODO:
        const dataRows = state.formData.dataRows.slice();
        const rowsCount = dataRows.length;
        let insertIdx = -1;
        // TODO:
        if (state.formDataSelectedRowsCount !== 1) {
            // デフォルトは最終行（合計表示行）の一つ前に追加
            insertIdx = rowsCount - 1;
        } else if (
            state.formDataFirstSelectedRowIdx > -1 &&
            state.formDataFirstSelectedRowIdx < rowsCount
        ) {
            // TODO: 選択行の前に挿入する
            insertIdx = state.formDataFirstSelectedRowIdx;
        }

        if (insertIdx > -1) {
            dataRows.splice(insertIdx, 0, {
                id: -1,
                labelSubtotalPrice: '小計:',
                subtotalPrice: 0,
                selected: false
            });
        } else {
            // 何もせずリターン (通常来ない)
            console.log(`ABNORMAL firstIdx=${state.formDataFirstSelectedRowIdx}`);
            return state;
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);

        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });

        // TODO: 編集済みフラグセット
        const formDataEditted = true;

        // TODO:  選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    // 行削除
    .case(CreateFormActions.deleteRows, state => {
        // TODO:
        const dataRows: (NormalDataRow | TotalPriceRow | SubtotalPriceRow)[] = [];

        for (const dataRowIdx in state.formData.dataRows) {
            if (
                !(state.formData.dataRows[dataRowIdx] as NormalDataRow)[NormalDataRowKeys.selected]
            ) {
                // 残す行
                dataRows.push(state.formData.dataRows[dataRowIdx]);
            }
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);

        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });

        // TODO: 編集済みフラグセット
        const formDataEditted = true;

        // TODO:  選択行の数等のチェック
        const ret = getSlecetedRowsInfo(formData.dataRows);

        return Object.assign(
            {},
            state,
            { formData, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })

    // .case(CreateFormActions.insertRow, (state, r) => {
    //     // TODO:

    //     // 合計を計算
    //     const totalPrice = calcTotalPrice(state.dataRows);

    //     return Object.assign({}, state, {formData:{ totalPrice /* TODO: */ }});
    // })

    // グリッド行更新
    .case(CreateFormActions.updateGridRow, (state, e) => {
        // TODO:
        const dataRows = state.formData.dataRows.slice();

        // tslint:disable-next-line:no-increment-decrement
        for (let i = e.fromRow; i <= e.toRow; i++) {
            if ((state.formData.dataRows[i] as any)[NormalDataRowKeys.price] !== undefined) {
                const rowToUpdate: NormalDataRow = state.formData.dataRows[i] as NormalDataRow;
                // TODO: 価格を計算
                // console.log(`unitPrice=${e.updated[FormDataRowKeys.unitPrice]}`);
                // console.log(`num=${e.updated[FormDataRowKeys.num]}`);
                const _unitPrice = !e.updated[NormalDataRowKeys.unitPrice]
                    ? rowToUpdate[NormalDataRowKeys.unitPrice]
                    : e.updated[NormalDataRowKeys.unitPrice];
                const _num = !e.updated[NormalDataRowKeys.num]
                    ? rowToUpdate[NormalDataRowKeys.num]
                    : e.updated[NormalDataRowKeys.num];

                e.updated[NormalDataRowKeys.price] = _unitPrice * _num;
                e.updated[NormalDataRowKeys.price_isEmpty] = false;

                const updatedRow = immutabilityHelper(rowToUpdate, { $merge: e.updated });
                dataRows[i] = updatedRow;
            }
        }
        // 合計を計算
        const totalPrice = calcTotalPrice(dataRows);

        // TODO: 編集済みフラグセット
        const formDataEditted = true;

        const formData = Object.assign({}, state.formData, { totalPrice, dataRows });
        return Object.assign({}, state, { formData, formDataEditted });
    })

    // 帳票読込 (開始)
    .case(CreateFormActions.openForm.started, state => {
        // TODO:
        return state;
    })
    // 帳票読込 (完了)
    .case(CreateFormActions.openForm.done, (state, payload) => {
        // TODO:
        // console.log(payload.result);
        const loadFormData = JSON.parse(payload.result.toString());
        // console.log(loadFormData);

        // TODO: 実験 完了時に通知を出してみる。
        const notify = NotifyContext.defaultNotify('帳票読込完了', CreateFormActions.closeNotify);
        // const notify = new NotifyContext('帳票読込完了', 1, true, 300, 'テストですよ');

        // TODO:  選択行の数等のチェック (てか、ロード時は全部解除すべきか？)
        const ret = getSlecetedRowsInfo(loadFormData.dataRows);

        // TODO: 編集済みフラグリセット
        const formDataEditted = false;

        return Object.assign(
            {},
            state,
            { formData: loadFormData },
            { notify, formDataEditted },
            { formDataSelectedRowsCount: ret.count, formDataFirstSelectedRowIdx: ret.firstIdx }
        );
    })
    // 帳票読込 (失敗)
    .case(CreateFormActions.openForm.failed, (state, payload) => {
        // TODO:
        // console.log(payload.error);

        // TODO: キャンセル時
        if (payload.error === 'CANCELED') {
            return state;
        }
        // TODO: 実験　失敗時に通知を出してみる。
        const notify = NotifyContext.defaultNotify('帳票読込失敗', CreateFormActions.closeNotify);

        return Object.assign({}, state, { notify });
    })
    // 帳票読込確認
    .case(CreateFormActions.confirmOpenForm, state => {
        // TODO:
        const notify = new NotifyContext(
            '現在の帳票は変更されています。保存せずに帳票読込を行いますか？（現在の帳票の変更内容は破棄されます)',
            1,
            true,
            0,
            '',
            'キャンセル',
            '続行',
            undefined,
            undefined,
            CreateFormActions.closeNotify,
            openFormWorker
        );

        return Object.assign({}, state, { notify });
    })

    // 帳票保存 (開始)
    .case(CreateFormActions.saveForm.started, state => {
        // TODO:
        // console.log('CreateFormActions.saveForm.started');
        // FormDataを送る
        saveForm_sendFormData(state.formData);

        return state;
    })
    // 帳票保存 (完了)
    .case(CreateFormActions.saveForm.done, (state, payload) => {
        // TODO:
        // console.log('CreateFormActions.saveForm.done');
        // TODO: 実験 完了時に通知を出してみる。
        const notify = NotifyContext.defaultNotify('帳票保存完了', CreateFormActions.closeNotify);

        // TODO: 編集済みフラグリセット
        const formDataEditted = false;

        return Object.assign({}, state, { notify, formDataEditted });
    })
    // 帳票保存 (失敗)
    .case(CreateFormActions.saveForm.failed, (state, payload) => {
        // TODO:
        // console.log('CreateFormActions.saveForm.failed');
        // TODO: キャンセル時
        if (payload.error === 'CANCELED') {
            return state;
        }
        // TODO: 実験 失敗時に通知を出してみる。
        const notify = NotifyContext.defaultNotify('帳票保存失敗', CreateFormActions.closeNotify);

        return Object.assign({}, state, { notify });
    })

    // 帳票印刷開始
    .case(CreateFormActions.startPrintForm, state => {
        // TODO:
        console.log('startPrintForm');

        // TODO: プリント用画面に切り替える
        const printing = true;
        return Object.assign({}, state, { printing });
    })
    // 帳票印刷終了
    .case(CreateFormActions.endPrintForm, state => {
        // TODO:
        console.log('endPrintForm');

        // TODO: プリント用画面を終了
        const printing = false;
        return Object.assign({}, state, { printing });
    })
    // 新規帳票作成
    .case(CreateFormActions.newForm, (state /*, force*/) => {
        // TODO: 初期データを復元する
        const formData = initialState.formData;
        console.log(formData);
        // 編集状態解除
        const formDataEditted = false;

        // 確認ダイアログが表示されているなら消す
        // TODO:
        const notify = state.notify.open ? state.notify.closedNotify() : state.notify;

        return Object.assign({}, state, { formData, formDataEditted }, { notify });
    })
    // 新規帳票作成確認
    .case(CreateFormActions.confirmNewForm, state => {
        // TODO:
        const notify = new NotifyContext(
            '現在の帳票は変更されています。保存せずに新規帳票作成を行いますか？（現在の帳票の変更内容は破棄されます)',
            1,
            true,
            0,
            '',
            'キャンセル',
            '続行',
            undefined,
            undefined,
            CreateFormActions.closeNotify,
            CreateFormActions.newForm
        );

        return Object.assign({}, state, { notify });
    })

    // .case(CreateFormActions.saveForm.started, state => {
    // 	// TODO:
    // 	return state;
    // })
    // .case(CreateFormActions.saveForm.done, state => {
    // 	// TODO:
    // 	return state;
    // })
    // .case(CreateFormActions.saveForm.failed, (state, err) => {
    // 	// TODO:
    // 	console.log(err);
    // 	return state;
    // })

    // セル選択
    .case(CreateFormActions.selectCell, (state, col) => {
        // TODO:
        return Object.assign({}, state, { sellectedCell: col });
    })

    // 行選択
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

    // 行選択解除
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

    // タイトル編集開始
    .case(CreateFormActions.startEdittingTitle, state => {
        // TODO:

        return Object.assign({}, state, { edittingTitle: true });
    })

    // タイトル編集終了
    .case(CreateFormActions.endEdittingTitle, (state, title) => {
        const formData = Object.assign({}, state.formData, { title });

        // TODO: 編集済みフラグセット
        const formDataEditted = true;

        return Object.assign({}, state, { formData, formDataEditted }, { edittingTitle: false });
    })

    // AutoCompleteOptions更新 (開始)
    .case(CreateFormActions.updateAutoCompleteOptions.started, (state, cell) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.started');
        return state;
    })
    // AutoCompleteOptions更新 (完了)
    .case(CreateFormActions.updateAutoCompleteOptions.done, (state, done) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.done');
        // console.log(done);
        return Object.assign({}, state, { autoCompleteOptions: done.result });
    })
    // AutoCompleteOptions更新 (失敗)
    .case(CreateFormActions.updateAutoCompleteOptions.failed, (state, error) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.failed');
        return state;
    })

    // TODO: 通知が閉じられた
    .case(CreateFormActions.closeNotify, state => {
        // TODO:
        const notify = state.notify.closedNotify();
        return Object.assign({}, state, { notify });
    })
    // TODO: 通知のクローズボタンがクリックされた
    .case(CreateFormActions.clickNotifyCloseButton, state => {
        // TODO:
        const notify = state.notify.closedNotify();
        return Object.assign({}, state, { notify });
    });

// 非同期でautoCompleteOptionsを更新する
export const updateAutoCompleteOptionsWorker = wrapThunkAsyncActionWorker<
    { rowData: NormalDataRow; columnDDKey: string },
    {},
    {}
>(
    CreateFormActions.updateAutoCompleteOptions,
    ({ rowData, columnDDKey }): Promise<{}> => {
        // console.log(columnDDKey);
        const _rowData = Object.assign({}, rowData, { [columnDDKey]: undefined });
        // console.log(_rowData);
        return updateAutoCompleteOptions(_rowData);
    }
);

// TODO: 非同期帳票読込
export const openFormWorker = wrapThunkAsyncActionParamVoidWorker<Buffer, {}>(
    CreateFormActions.openForm,
    openForm
);

// TODO: 非同期帳票保存
export const saveFormWorker = wrapThunkAsyncActionParamVoidWorker<{}, {}>(
    CreateFormActions.saveForm,
    saveForm
);

// TODO: 確認付き帳票読込 ※ここに置くべきか？要検討
export const openFormWithConfirmWorker = () => (
    dispatch: ThunkDispatch<IAppState, {}, any>,
    getState: () => IAppState
) => {
    console.log('openFormWithConfirm');
    const { formDataEditted } = getState().createFormState;

    if (formDataEditted) {
        // 編集済みのため、読込前にユーザ確認する
        dispatch(CreateFormActions.confirmOpenForm());
    } else {
        // 未編集なのでこのまま読込処理へ
        // openFormWorker(dispatch, void {});
        dispatch(openFormWorker());
    }
};

// TODO: 確認付き新規帳票作成 ※ここに置くべきか？要検討
export const newFormWithConfirmWorker = () => (
    dispatch: ThunkDispatch<IAppState, {}, any>,
    getState: () => IAppState
) => {
    console.log('newFormWithConfirm');
    const { formDataEditted } = getState().createFormState;

    if (formDataEditted) {
        // 編集済みのため、新規作成前にユーザ確認する
        dispatch(CreateFormActions.confirmNewForm());
    } else {
        // 未編集なのでこのまま新規帳票作成処理へ
        dispatch(CreateFormActions.newForm());
    }
};

// TODO: 印刷処理ワーカー
export const printFormWorker = () => (
    dispatch: ThunkDispatch<IAppState, {}, any>,
    getState: () => IAppState
) => {
    console.log('printFormWorker');
    // 印刷開始
    dispatch(CreateFormActions.startPrintForm());

    // TODO:  実験中
    const webContents = remote.getCurrentWindow().webContents;
    webContents.print(
        { silent: false, printBackground: false, deviceName: '' },
        (success: boolean) => {
            if (!success) {
                // TODO:  失敗した場合エラー表示する
                console.log('帳票印刷失敗');
            }
            console.log('印刷終了');
            // 印刷終了
            dispatch(CreateFormActions.endPrintForm());
        }
    );
};
