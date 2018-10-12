//
// file_io
//
'use strict';

const _request = '-request';
const _result = '-result';
const _reject = '-reject';
const _reply = '_reply';

export namespace OpenForm {
    const prefix = 'openForm';
    export const Request = prefix + _request;
    export const Result = prefix + _result;
    export const Reject = prefix + _reject;
    export const Reply = prefix + _reply;
}

export namespace SaveForm {
    const prefix = 'saveForm';
    export const Request = prefix + _request;
    export const Result = prefix + _result;
    export const Reject = prefix + _reject;
    export const Reply = prefix + _reply;
}
