/**
 * ManageDataState
 */
'use strict';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ManageDataActions } from '../actions/ManageDataAction';
import * as db from '../db';

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
    checked: boolean;
}
const initialState: IManageDataState = {
    checked: true
};

/**
 * ManageDataStateReducer
 */
export const ManageDataStateReducer = reducerWithInitialState<IManageDataState>(initialState);
// .case(
// 	ManageDataActions.updateValue,
// 	(state, checked) => {
// 		return Object.assign({}, state, { checked });
// 	}
// );
