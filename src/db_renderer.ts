//
// db_renderer
//
'use strict';
import { ipcRenderer } from 'electron';

import { DataDocKeys, DataDoc, ConfDoc, UpdateAutoCompleteOptions } from './db';

// AutoCompleteOptions 更新
export const updateAutoCompleteOptions = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        ipcRenderer.on(UpdateAutoCompleteOptions.Result, (event: any, result: any) => {
            // console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            resolve(result);
        });
        ipcRenderer.on(UpdateAutoCompleteOptions.Reject, (event: any, error: any) => {
            // console.log(`updateAutoCompleteOptions-reject=${error}`);
            reject(error);
        });
        ipcRenderer.on(UpdateAutoCompleteOptions.Reply, (event: any, reply: any) => {
            /* TODO: */
            // console.log(`updateAutoCompleteOptions-reply = ${reply}`);
        });
        //
        // console.log('Send updateAutoCompleteOptions-request');
        ipcRenderer.send(UpdateAutoCompleteOptions.Request, [query, projection]);
    });
};
