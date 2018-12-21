/**
 * file_io
 */
'use strict';

const _request = '-request';
const _result = '-result';

export namespace OpenForm {
    const prefix = 'openForm';
    export const Request = prefix + _request;
    export const Result = prefix + _result;
}

export namespace SaveForm {
    const prefix = 'saveForm';
    export const Request = prefix + _request;
    export const Result = prefix + _result;
}
