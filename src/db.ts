//
// db (client)
//
'use strict';
import { ipcRenderer } from 'electron';

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

export const updateAutoCompleteOptions = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        ipcRenderer.on('updateAutoCompleteOptions-result', (event: any, result: any) => {
            console.log(`updateAutoCompleteOptions-result=${{ ...result }}`);
            resolve(result);
        });
        ipcRenderer.on('updateAutoCompleteOptions-reject', (event: any, error: any) => {
            console.log(`updateAutoCompleteOptions-reject=${error}`);
            reject(error);
        });
        ipcRenderer.on('updateAutoCompleteOptions-reply', (event: any, reply: any) => {
            /* TODO: */
            console.log(`updateAutoCompleteOptions-reply = ${reply}`);
        });
        //
        console.log('Send updateAutoCompleteOptions-request');
        ipcRenderer.send('updateAutoCompleteOptions-request', [query, projection]);
    });
};
