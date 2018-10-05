//
// CreateFormState
//
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CreateFormActions } from '../actions/CreateFormAction';
import immutabilityHelper from 'immutability-helper';

// FormDataRowKeys
export namespace FormDataRowKeys {
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

    export const checked = 'checked'; // : boolean;
}
export interface FormDataRow {
    [FormDataRowKeys.id]: number;

    [FormDataRowKeys.level_1]: string; // 大項目
    [FormDataRowKeys.level_1_isValid]: boolean;
    [FormDataRowKeys.level_1_isEmpty]: boolean;

    [FormDataRowKeys.level_2]: string; // 中項目
    [FormDataRowKeys.level_2_isValid]: boolean;
    [FormDataRowKeys.level_2_isEmpty]: boolean;

    [FormDataRowKeys.level_3]: string; // 小項目
    [FormDataRowKeys.level_3_isValid]: boolean;
    [FormDataRowKeys.level_3_isEmpty]: boolean;

    [FormDataRowKeys.itemName]: string; // 名称
    [FormDataRowKeys.itemName_isValid]: boolean;
    [FormDataRowKeys.itemName_isEmpty]: boolean;

    [FormDataRowKeys.unitPrice]: number; // 単価 TODO: データをどのように持たすか？
    [FormDataRowKeys.unitPrice_isValid]: boolean;
    [FormDataRowKeys.unitPrice_isEmpty]: boolean;

    [FormDataRowKeys.num]: number; // 個数
    [FormDataRowKeys.num_isValid]: boolean;
    [FormDataRowKeys.num_isEmpty]: boolean;

    [FormDataRowKeys.price]: number; // 価格
    [FormDataRowKeys.price_isEmpty]: boolean;

    [FormDataRowKeys.checked]: boolean;
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
// CreateFormState
export interface ICreateFormState {
    dataRows: (FormDataRow | SubtotalPriceRow | TotalPriceRow)[];
    title: string;
    edittingTitle: boolean;
    edittingCell: { rowIdx: number; idx: number };
    selectedRow: number;
    selectedCell: { rowIdx: number; idx: number };
    totalPrice: number;

    // TODO:
    autoCompleteOptions: {};
}
const initialState: ICreateFormState = {
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
            checked: false
        },
        {
            id: -1,
            [TotalPriceRowKeys.labelTotalPrice]: '合計:',
            [TotalPriceRowKeys.totalPrice]: 0
        }
    ],
    title: '無題',
    edittingTitle: false,
    edittingCell: { rowIdx: -1, idx: -1 },
    selectedRow: -1,
    selectedCell: { rowIdx: -1, idx: -1 },
    totalPrice: 0,
    // TODO:
    autoCompleteOptions: {}
};

// 合計・小計計算
function calcTotalPrice(rows: any[]): number {
    let sumPrice: number = 0;
    let subSumPrice: number = 0;
    for (let i = 0; i < rows.length; i = i + 1) {
        if (
            rows[i][FormDataRowKeys.price] !== undefined &&
            !rows[i][FormDataRowKeys.price_isEmpty]
        ) {
            sumPrice += rows[i][FormDataRowKeys.price];
            subSumPrice += rows[i][FormDataRowKeys.price];
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

/* Reducer */
// TODO:
export const CreateFormStateReducer = reducerWithInitialState<ICreateFormState>(initialState)
    .case(CreateFormActions.addRow, state => {
        // TODO:
        // console.log('addRow');
        const newDataRows = state.dataRows.slice();
        const rowsCount = newDataRows.length;

        newDataRows.splice(/*最終行（合計表示行）の一つ前に追加*/ rowsCount - 1, 0, {
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
            checked: false
        });

        // 合計を計算
        const totalPrice = calcTotalPrice(newDataRows);

        return Object.assign({}, state, { totalPrice, dataRows: newDataRows });
    })
    .case(CreateFormActions.addSubtotalRow, state => {
        // 実験
        const newDataRows = state.dataRows.slice();
        const rowsCount = newDataRows.length;

        newDataRows.splice(/*最終行（合計表示行）の一つ前に追加*/ rowsCount - 1, 0, {
            id: -1,
            labelSubtotalPrice: '小計:',
            subtotalPrice: 0,
            checked: false
        });

        // 合計を計算
        const totalPrice = calcTotalPrice(newDataRows);

        return Object.assign({}, state, { totalPrice, dataRows: newDataRows });
    })
    .case(CreateFormActions.deleteRows, state => {
        // TODO:
        const newDataRows: (FormDataRow | TotalPriceRow | SubtotalPriceRow)[] = [];

        for (const dataRowIdx in state.dataRows) {
            if (!(state.dataRows[dataRowIdx] as FormDataRow)[FormDataRowKeys.checked]) {
                // 残す行
                newDataRows.push(state.dataRows[dataRowIdx]);
            }
        }

        // 合計を計算
        const totalPrice = calcTotalPrice(newDataRows);

        return Object.assign({}, state, { dataRows: newDataRows }, { totalPrice /* TODO: */ });
    })
    // .case(CreateFormActions.endEdittingCell, (state, cell) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.endEdittingTitle, (state, title) => {
        return Object.assign({}, state, { title }, { edittingTitle: false });
    })
    .case(CreateFormActions.insertRow, (state, r) => {
        // TODO:

        // 合計を計算
        const totalPrice = calcTotalPrice(state.dataRows);

        return Object.assign({}, state, { totalPrice /* TODO: */ });
    })
    .case(CreateFormActions.updateGridRow, (state, e) => {
        // TODO:
        const _rows = state.dataRows.slice();

        // tslint:disable-next-line:no-increment-decrement
        for (let i = e.fromRow; i <= e.toRow; i++) {
            if ((state.dataRows[i] as any)[FormDataRowKeys.price] !== undefined) {
                const rowToUpdate: FormDataRow = state.dataRows[i] as FormDataRow;
                // TODO: 価格を計算
                // console.log(`unitPrice=${e.updated[FormDataRowKeys.unitPrice]}`);
                // console.log(`num=${e.updated[FormDataRowKeys.num]}`);
                const _unitPrice = !e.updated[FormDataRowKeys.unitPrice]
                    ? rowToUpdate[FormDataRowKeys.unitPrice]
                    : e.updated[FormDataRowKeys.unitPrice];
                const _num = !e.updated[FormDataRowKeys.num]
                    ? rowToUpdate[FormDataRowKeys.num]
                    : e.updated[FormDataRowKeys.num];

                e.updated[FormDataRowKeys.price] = _unitPrice * _num;
                e.updated[FormDataRowKeys.price_isEmpty] = false;

                const updatedRow = immutabilityHelper(rowToUpdate, { $merge: e.updated });
                _rows[i] = updatedRow;
            }
        }
        // 合計を計算
        const totalPrice = calcTotalPrice(_rows);

        return Object.assign({}, state, { totalPrice, dataRows: _rows });
    })
    .case(CreateFormActions.loadFrom, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.printForm, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.saveForm, state => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.selectCell, (state, col) => {
        // TODO:
        return Object.assign({}, state, { sellectedCell: col });
    })
    .case(CreateFormActions.selectRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.selectRows, (state, rows) => {
        // TODO:
        const newDataRows = state.dataRows.map((value, index, array) => {
            if ((value as TotalPriceRow)[TotalPriceRowKeys.totalPrice] === undefined) {
                // 合計表示行は選択不能にする
                for (let i = 0; i < rows.length; i = i + 1) {
                    if (index === rows[i].rowIdx) {
                        // 選択された
                        return Object.assign({}, array[index], { checked: true });
                    }
                }
            }
            // 選択されてない
            return Object.assign({}, array[index]);
        });

        return Object.assign({}, state, { dataRows: newDataRows });
    })
    .case(CreateFormActions.deselectRows, (state, rows) => {
        // TODO:
        const newDataRows = state.dataRows.map((value, index, array) => {
            for (let i = 0; i < rows.length; i = i + 1) {
                if (index === rows[i].rowIdx) {
                    // 選択解除された
                    return Object.assign({}, array[index], { checked: false });
                }
            }
            // 選択解除されてない
            return Object.assign({}, array[index]);
        });

        return Object.assign({}, state, { dataRows: newDataRows });
    })
    // .case(CreateFormActions.startEdittingCell, (state, cell) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.startEdittingTitle, state => {
        // TODO:

        return Object.assign({}, state, { edittingTitle: true });
    })
    // .case(CreateFormActions.updateEdittingCellValue, (state, value) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.updateAutoCompleteOptions.started, (state, cell) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.started');
        return state;
    })
    .case(CreateFormActions.updateAutoCompleteOptions.done, (state, done) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.done');
        // console.log(done);
        return Object.assign({}, state, { autoCompleteOptions: done.result });
    })
    .case(CreateFormActions.updateAutoCompleteOptions.failed, (state, error) => {
        // TODO:
        // console.log('CreateFormActions.updateAutoCompleteOptions.failed');
        return state;
    });
