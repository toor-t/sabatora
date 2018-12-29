/**
 * db_renderer
 */

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

/**
 * UpdateAutoCompleteOptions
 * @param query
 * @param projection
 */
export const updateAutoCompleteOptions = (
    query: DataDoc,
    projection: (keyof DataDoc)[] = []
): Promise<autoCompleteOptionsType> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(
            UpdateAutoCompleteOptions.Result,
            (event: Event, result: [autoCompleteOptionsType | null, Error | null]) => {
                if (result[0] !== null) {
                    resolve(result[0]);
                } else {
                    reject(result[1]);
                }
            }
        );

        // Send
        ipcRenderer.send(UpdateAutoCompleteOptions.Request, [query, projection]);
    });
};

/**
 * dbQuery
 * @param query
 * @param projection
 */
export const queryDb = (query: DataDoc, projection: (keyof DataDoc)[] = []): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(
            QueryDb.Result,
            (event: Event, result: [DataDoc[] | null, Error | null]) => {
                if (result[0] !== null) {
                    resolve(result[0]);
                } else {
                    reject(result[1]);
                }
            }
        );

        // Send
        ipcRenderer.send(QueryDb.Request, [query, projection]);
    });
};

/**
 * dbUpdate
 * @param query
 * @param update
 */
export const updateDb = (query: DataDoc, update: DataDoc): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(
            UpdateDb.Result,
            (event: Event, result: [DataDoc[] | null, Error | null]) => {
                if (result[0] !== null) {
                    resolve(result[0]);
                } else {
                    reject(result[1]);
                }
            }
        );

        // Send
        ipcRenderer.send(UpdateDb.Request, [query, update]);
    });
};

/**
 * dbInsert
 * @param doc
 */
export const insertDb = (doc: DataDoc): Promise<DataDoc> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(
            InsertDb.Result,
            (event: Event, result: [DataDoc | null, Error | null]) => {
                if (result[0] !== null) {
                    resolve(result[0]);
                } else {
                    reject(result[1]);
                }
            }
        );

        // Send
        ipcRenderer.send(InsertDb.Request, [doc]);
    });
};

/**
 * dbRemove
 * @param query
 */
export const removeDb = (query: DataDoc): Promise<number> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(RemoveDb.Result, (event: Event, result: [number | null, Error | null]) => {
            if (result[0] !== null) {
                resolve(result[0]);
            } else {
                reject(result[1]);
            }
        });

        // Send
        ipcRenderer.send(RemoveDb.Request, [query]);
    });
};
