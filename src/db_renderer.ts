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
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: autoCompleteOptionsType) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(UpdateAutoCompleteOptions.Reject, rejectListener);
            ipcRenderer.removeListener(UpdateAutoCompleteOptions.Result, resultListener);
        };
        ipcRenderer.once(UpdateAutoCompleteOptions.Reject, rejectListener);

        // Send
        ipcRenderer.send(UpdateAutoCompleteOptions.Request, [query, projection]);
    });
};

// dbQuery
export const queryDb = (query: DataDoc, projection: (keyof DataDoc)[] = []): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: DataDoc[]) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(QueryDb.Result, resultListener);
            ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
        };
        ipcRenderer.once(QueryDb.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(QueryDb.Reject, rejectListener);
            ipcRenderer.removeListener(QueryDb.Result, resultListener);
        };
        ipcRenderer.once(QueryDb.Reject, rejectListener);

        // Send
        ipcRenderer.send(QueryDb.Request, [query, projection]);
    });
};

// dbUpdate
export const updateDb = (query: DataDoc, update: DataDoc): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: DataDoc[]) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(UpdateDb.Result, resultListener);
            ipcRenderer.removeListener(UpdateDb.Reject, rejectListener);
        };
        ipcRenderer.once(UpdateDb.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(UpdateDb.Reject, rejectListener);
            ipcRenderer.removeListener(UpdateDb.Result, resultListener);
        };
        ipcRenderer.once(UpdateDb.Reject, rejectListener);

        // Send
        ipcRenderer.send(UpdateDb.Request, [query, update]);
    });
};

// dbInsert
export const insertDb = (doc: DataDoc): Promise<DataDoc> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: DataDoc) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(InsertDb.Result, resultListener);
            ipcRenderer.removeListener(InsertDb.Reject, rejectListener);
        };
        ipcRenderer.once(InsertDb.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(InsertDb.Reject, rejectListener);
            ipcRenderer.removeListener(InsertDb.Result, resultListener);
        };
        ipcRenderer.once(InsertDb.Reject, rejectListener);

        // Send
        ipcRenderer.send(InsertDb.Request, [doc]);
    });
};

// dbRemove
export const removeDb = (query: DataDoc): Promise<number> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: number) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(RemoveDb.Result, resultListener);
            ipcRenderer.removeListener(RemoveDb.Reject, rejectListener);
        };
        ipcRenderer.once(RemoveDb.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(RemoveDb.Reject, rejectListener);
            ipcRenderer.removeListener(RemoveDb.Result, resultListener);
        };
        ipcRenderer.once(RemoveDb.Reject, rejectListener);

        // Send
        ipcRenderer.send(RemoveDb.Request, [query]);
    });
};
