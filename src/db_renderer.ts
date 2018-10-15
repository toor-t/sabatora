/**
 * db_renderer
 */
'use strict';
import { ipcRenderer } from 'electron';
import { UpdateAutoCompleteOptions, QueryDb } from './db';

// AutoCompleteOptions
export const updateAutoCompleteOptions = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: any, result: any) => {
            // console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Result, resultListener);
        const rejectListener = (event: any, result: any) => {
            // console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Reject, rejectListener);
        const replyListener = (event: any, reply: any) => {
            /* TODO: */
            // console.log(`updateAutoCompleteOptions-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reply, replyListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Reply, replyListener);
        //
        // console.log('Send updateAutoCompleteOptions-request');
        ipcRenderer.send(UpdateAutoCompleteOptions.Request, [query, projection]);
    });
};

// dbQuery
export const queryDb = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: any, result: any) => {
            // console.log(`QueryDb-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(QueryDb.Result, resultListener);
            ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
        };
        ipcRenderer.once(QueryDb.Result, resultListener);
        const rejectListener = (event: any, result: any) => {
            // console.log(`QueryDb-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
            ipcRenderer.removeListener(QueryDb.Result, resultListener);
        };
        ipcRenderer.once(QueryDb.Reject, rejectListener);
        const replyListener = (event: any, reply: any) => {
            /* TODO: */
            // console.log(`QueryDb-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(QueryDb.Reply, replyListener);
        };
        ipcRenderer.once(QueryDb.Reply, replyListener);
        //
        // console.log('Send QueryDb-request');
        ipcRenderer.send(QueryDb.Request, [query, projection]);
    });
};
