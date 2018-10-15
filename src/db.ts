/**
 * db
 */
'use strict';

export namespace DataDocKeys {
    export const level_1 = 'level_1';
    export const level_2 = 'level_2';
    export const level_3 = 'level_3';
    export const itemName = 'itemName';
    export const unitPrice = 'unitPrice';
}

export interface DataDoc {
    // TODO:
    [DataDocKeys.level_1]: string; // 大1
    [DataDocKeys.level_2]: string; // 中2
    [DataDocKeys.level_3]: string; // 小3
    [DataDocKeys.itemName]: string; // 名称
    [DataDocKeys.unitPrice]: number[]; // 単価
}

export interface ConfDoc {
    // TODO:
}

export namespace UpdateAutoCompleteOptions {
    export const Request = 'updateAutoCompleteOptions-request';
    export const Result = 'updateAutoCompleteOptions-result';
    export const Reject = 'updateAutoCompleteOptions-reject';
    export const Reply = 'updateAutoCompleteOptions-reply';
}
