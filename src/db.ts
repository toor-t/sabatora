/**
 * db
 */
'use strict';

export namespace DataDocKeys {
    export const _id = '_id';

    export const level_1 = 'level_1';
    export const level_2 = 'level_2';
    export const level_3 = 'level_3';
    // Level数は現状3で固定。

    export const itemName = 'itemName';

    export const unitPrice = 'unitPrice';
    // unitPriceの配列要素数はDB的には可変。
    // だが、データ管理画面で３つに固定してしまっている。
}

export interface DataDoc {
    [DataDocKeys._id]?: string;

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

export namespace QueryDb {
    export const Request = 'queryDb-request';
    export const Result = 'queryDb-result';
    export const Reject = 'queryDb-reject';
    export const Reply = 'queryDb-reply';
}

export namespace UpdateDb {
    export const Request = 'updateDb-request';
    export const Result = 'updateDb-result';
    export const Reject = 'updateDb-reject';
    export const Reply = 'updateDb-reply';
}

export namespace InsertDb {
    export const Request = 'insertDb-request';
    export const Result = 'insertDb-result';
    export const Reject = 'insertDb-reject';
    export const Reply = 'insertDb-reply';
}

export namespace RemoveDb {
    export const Request = 'removeDb-request';
    export const Result = 'removeDb-result';
    export const Reject = 'removeDb-reject';
    export const Reply = 'removeDb-reply';
}
