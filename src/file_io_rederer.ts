/*
 * file_io_renderer
 */

import { ipcRenderer, Event } from 'electron';
import { OpenForm, SaveForm } from './file_io';
import { FormData } from './states/CreateFormState';

/**
 * OpenForm
 */
export const openForm = (): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(OpenForm.Result, (event: Event, result: [Buffer | null, Error | null]) => {
            if (result[0] !== null) {
                resolve(result[0]);
            } else {
                reject(result[1]);
            }
        });

        // Send
        ipcRenderer.send(OpenForm.Request, []);
    });
};

/**
 * SaveForm
 */
export const saveForm = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(SaveForm.Result, (event: Event, result: [void | null, Error | null]) => {
            if (result[0] !== null) {
                resolve(result[0]);
            } else {
                reject(result[1]);
            }
        });

        // TODO: ここでは送らない。started アクション処理で送る
        // ipcRenderer.send(SaveForm.Request, []);
    });
};
export const saveForm_sendFormData = (formData: FormData) => {
    // Send
    ipcRenderer.send(SaveForm.Request, [formData]);
};
