/**
 * db_renderer
 */
'use strict';
import { ipcRenderer, Event } from 'electron';
import {
    UpdateAutoCompleteOptions,
    QueryDb,
    UpdateDb,
    InsertDb,
    RemoveDb,
    DataDoc,
    autoCompleteOptionsType
} from './db';

// AutoCompleteOptions
export const updateAutoCompleteOptions = (
    query: DataDoc,
    projection: (keyof DataDoc)[] = []
): Promise<autoCompleteOptionsType> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: autoCompleteOptionsType) => {
            // console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Reject, rejectListener);
        const replyListener = (event: Event, reply: string /*TODO:*/) => {
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
export const queryDb = (query: DataDoc, projection: (keyof DataDoc)[] = []): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: DataDoc[]) => {
            // console.log(`QueryDb-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(QueryDb.Result, resultListener);
            ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
        };
        ipcRenderer.once(QueryDb.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`QueryDb-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
            ipcRenderer.removeListener(QueryDb.Result, resultListener);
        };
        ipcRenderer.once(QueryDb.Reject, rejectListener);
        const replyListener = (event: Event, reply: string /*TODO:*/) => {
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

// dbUpdate
export const updateDb = (query: DataDoc, update: DataDoc): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: DataDoc[]) => {
            // console.log(`UpdateDb-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateDb.Result, resultListener);
            ipcRenderer.removeListener(UpdateDb.Reject, rejectListener);
        };
        ipcRenderer.once(UpdateDb.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`UpdateDb-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(UpdateDb.Reject, rejectListener);
            ipcRenderer.removeListener(UpdateDb.Result, resultListener);
        };
        ipcRenderer.once(UpdateDb.Reject, rejectListener);
        const replyListener = (event: Event, reply: string /*TODO:*/) => {
            /* TODO: */
            // console.log(`UpdateDb-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(UpdateDb.Reply, replyListener);
        };
        ipcRenderer.once(UpdateDb.Reply, replyListener);
        //
        // console.log('Send UpdateDb-request');
        ipcRenderer.send(UpdateDb.Request, [query, update]);
    });
};

// dbInsert
export const insertDb = (doc: DataDoc): Promise<DataDoc> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: DataDoc) => {
            // console.log(`InsertDb-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(InsertDb.Result, resultListener);
            ipcRenderer.removeListener(InsertDb.Reject, rejectListener);
        };
        ipcRenderer.once(InsertDb.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`InsertDb-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(InsertDb.Reject, rejectListener);
            ipcRenderer.removeListener(InsertDb.Result, resultListener);
        };
        ipcRenderer.once(InsertDb.Reject, rejectListener);
        const replyListener = (event: Event, reply: string /*TODO:*/) => {
            /* TODO: */
            // console.log(`InsertDb-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(InsertDb.Reply, replyListener);
        };
        ipcRenderer.once(InsertDb.Reply, replyListener);
        //
        // console.log('Send InsertDb-request');
        ipcRenderer.send(InsertDb.Request, [doc]);
    });
};

// dbRemove
export const removeDb = (query: DataDoc): Promise<number> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: number) => {
            // console.log(`RemoveDb-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(RemoveDb.Result, resultListener);
            ipcRenderer.removeListener(RemoveDb.Reject, rejectListener);
        };
        ipcRenderer.once(RemoveDb.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`RemoveDb-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(RemoveDb.Reject, rejectListener);
            ipcRenderer.removeListener(RemoveDb.Result, resultListener);
        };
        ipcRenderer.once(RemoveDb.Reject, rejectListener);
        const replyListener = (event: Event, reply: string /*TODO:*/) => {
            /* TODO: */
            // console.log(`RemoveDb-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(RemoveDb.Reply, replyListener);
        };
        ipcRenderer.once(RemoveDb.Reply, replyListener);
        //
        // console.log('Send RemoveDb-request');
        ipcRenderer.send(RemoveDb.Request, [query]);
    });
};
