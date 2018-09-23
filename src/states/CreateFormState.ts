'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CreateFormActions } from '../actions/CreateFormAction';
import immutabilityHelper from 'immutability-helper';

import { data_db } from '../db';

import wrapAsyncWorker from '../wrapAsyncWorker';

export interface FormDataRow {
    id: number;

    level_1: string; // 大項目
    level_1_isValid: boolean;
    level_1_isEmpty: boolean;

    level_2: string; // 中項目
    level_2_isValid: boolean;
    level_2_isEmpty: boolean;

    level_3: string; // 小項目
    level_3_isValid: boolean;
    level_3_isEmpty: boolean;

    itemName: string; // 名称
    itemName_isValid: boolean;
    itemName_isEmpty: boolean;

    unitPrice: number; // 単価 TODO: データをどのように持たすか？
    unitPrice_isValid: boolean;
    unitPrice_isEmpty: boolean;

    num: number; // 個数
    num_isValid: boolean;
    num_isEmpty: boolean;

    price: number; // 価格
    price_isEmpty: boolean;

    checked: boolean;
}

// TODO:
export interface ICreateFormState {
    dataRows: FormDataRow[];
    title: string;
    isEditting: boolean;
    edittingCell: { column: number; row: number };
    selectedRow: number;
    selectedCell: { column: number; row: number };
    totalPrice: number;

    // TODO:
    autoCompleteOptions: { id: number; title: string }[];
}

// TODO:
const initialState: ICreateFormState = {
    dataRows: [
        {
            id: 0,
            level_1: '大項目1',
            level_1_isValid: true,
            level_1_isEmpty: false,
            level_2: '中項目1',
            level_2_isValid: true,
            level_2_isEmpty: false,
            level_3: '小項目1',
            level_3_isValid: true,
            level_3_isEmpty: false,
            itemName: 'すごいもの1',
            itemName_isEmpty: false,
            itemName_isValid: true,
            unitPrice: 100,
            unitPrice_isEmpty: false,
            unitPrice_isValid: true,
            num: 0,
            num_isEmpty: false,
            num_isValid: true,
            price: 0,
            price_isEmpty: false,
            checked: false
        }
    ],
    title: 'Untitled',
    isEditting: false,
    edittingCell: { column: -1, row: -1 },
    selectedRow: -1,
    selectedCell: { column: -1, row: -1 },
    totalPrice: 0,
    // TODO:
    autoCompleteOptions: [{ id: 0, title: '残念!!' }, { id: 1, title: 'うまくいかないよ。' }]
};

// TODO: 非同期でautoCompleteOptionsを更新する
export const updateAutoCompleteOptionsWorker = wrapAsyncWorker<
    { rowIdx: number; idx: number },
    {}[],
    {}
>(
    CreateFormActions.updateAutoCompleteOptions,
    ({ rowIdx, idx }): Promise<{}[]> => {
        return updateAutoCompleteOptions(rowIdx, idx);
    }
);

const updateAutoCompleteOptions = (rowIdx: number, idx: number): Promise<{}[]> => {
    let keyName: string = '';
    switch (idx) {
        case 1: // 大項目
            keyName = 'level_1';
            break;
        case 2: // 中項目
            keyName = 'level_2';
            break;
        case 3: // 小項目
            keyName = 'level_3';
            break;
        case 4: // 名称
            keyName = 'itemName';
            break;
    }
    return new Promise((resolve, reject) => {
        data_db.find(
            {
                /*level_2: _level_2, level_3: _level_3, itemName: _itemName*/
            },
            { [keyName]: 1 },
            (err, docs: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log('hogehoge');
                    const newDocs: string[] = [];
                    for (let i = 0; i < docs.length; i = i + 1) {
                        const doc = docs[i];
                        newDocs.push(doc[keyName]);
                    }
                    const result = Array.from(new Set(newDocs));
                    const _autoCompleteOptions: {}[] = [];
                    for (let i = 0; i < result.length; i = i + 1) {
                        _autoCompleteOptions.push({
                            id: i,
                            title: result[i]
                        });
                    }
                    // console.log(`_autoCompleteOptions=${_autoCompleteOptions}`);
                    resolve(_autoCompleteOptions);
                }
            }
        );
    });
};

// TODO:
export const CreateFormStateReducer = reducerWithInitialState<ICreateFormState>(initialState)
    .case(CreateFormActions.addRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.deleteRow, (state, r) => {
        // TODO:
        return state;
    })
    // .case(CreateFormActions.endEdittingCell, (state, cell) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.endEdittingTitle, (state, _title) => {
        return Object.assign({}, state, { title: _title });
    })
    .case(CreateFormActions.insertRow, (state, r) => {
        // TODO:
        return state;
    })
    .case(CreateFormActions.updateGridRow, (state, e) => {
        // TODO:
        const _rows = state.dataRows.slice();

        // tslint:disable-next-line:no-increment-decrement
        for (let i = e.fromRow; i <= e.toRow; i++) {
            const rowToUpdate = state.dataRows[i];
            const updatedRow = immutabilityHelper(rowToUpdate, { $merge: e.updated });
            _rows[i] = updatedRow;
        }
        return Object.assign({}, state, { dataRows: _rows });
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
        // autoCompleteOptions をアップデートする
        const { rowIdx, idx } = col;

        const _row = state.dataRows[rowIdx];
        let _level_1 = _row.level_1 === '' || _row.level_1 === undefined ? '' : _row.level_1;
        let _level_2 = _row.level_2 === '' || _row.level_2 === undefined ? '' : _row.level_2;
        let _level_3 = _row.level_3 === '' || _row.level_3 === undefined ? '' : _row.level_3;
        let _itemName = _row.itemName === '' || _row.itemName === undefined ? '' : _row.itemName;

        let result: {}[];
        const _autoCompleteOptions: { id: number; title: string }[] = [];
        switch (idx) {
            case 1: // 大項目
                _level_1 = '';
                new Promise((resolve, reject) => {
                    data_db.find(
                        {
                            /*level_2: _level_2, level_3: _level_3, itemName: _itemName*/
                        },
                        { level_1: 1 },
                        (err, docs) => {
                            if (err) {
                                reject(err);
                            } else {
                                // console.log('hogehoge');
                                resolve(docs);
                            }
                        }
                    );
                }).then(
                    docs => {
                        result = Array.from(new Set(docs as {}[]));

                        for (let i = 0; i < result.length; i = i + 1) {
                            _autoCompleteOptions.push({
                                id: i,
                                title: (result[i] as { level_1: string }).level_1
                            });
                        }
                        // console.log(`_autoCompleteOptions=${_autoCompleteOptions}`);
                    },
                    err => {}
                );

                const newState = Object.assign({}, state, {
                    autoCompleteOptions: _autoCompleteOptions
                });
                // console.log(`newState=${newState}`);
                return newState;
                break;
            case 2: // 中項目
                _level_2 = '';
                break;
            case 3: // 小項目
                _level_3 = '';
                break;
            case 4: // 名称
                _itemName = '';
                break;
            default:
                break;
        }

        return Object.assign({}, state, { autoCompleteOptions: [{ id: 0, title: `${col.idx}` }] });
    })
    .case(CreateFormActions.selectRow, (state, r) => {
        // TODO:
        return state;
    })
    // .case(CreateFormActions.startEdittingCell, (state, cell) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.startEdittingTitle, (state, cell) => {
        // TODO:
        return state;
    })
    // .case(CreateFormActions.updateEdittingCellValue, (state, value) => {
    //     // TODO:
    //     return state;
    // })
    .case(CreateFormActions.updateAutoCompleteOptions.started, (state, cell) => {
        // TODO:
        console.log('CreateFormActions.updateAutoCompleteOptions.started');
        return state;
    })
    .case(CreateFormActions.updateAutoCompleteOptions.done, (state, done) => {
        // TODO:
        console.log('CreateFormActions.updateAutoCompleteOptions.done');
        console.log(done);
        return Object.assign({}, state, { autoCompleteOptions: done.result });
    })
    .case(CreateFormActions.updateAutoCompleteOptions.failed, (state, error) => {
        // TODO:
        console.log('CreateFormActions.updateAutoCompleteOptions.failed');
        return state;
    });
