/*
 * file_io_renderer
 */
'use strict';
import { ipcRenderer, Event } from 'electron';
import { OpenForm, SaveForm } from './file_io';
import { IFormData } from './states/CreateFormState';

// OpenForm
export const openForm = (): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: Buffer) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(OpenForm.Result, resultListener);
            ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
        };
        ipcRenderer.once(OpenForm.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
            ipcRenderer.removeListener(OpenForm.Result, resultListener);
        };
        ipcRenderer.once(OpenForm.Reject, rejectListener);

        // /**
        //  * replyListener
        //  * @param event
        //  * @param reply
        //  */
        // const replyListener = (event: Event, reply: string) => {
        // 	// // Remove Listner
        // 	// ipcRenderer.removeListener(OpenForm.Reply, replyListener);
        // };
        // ipcRenderer.once(OpenForm.Reply, replyListener);

        // Send
        ipcRenderer.send(OpenForm.Request, []);
    });
};

// SaveForm
export const saveForm = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: void) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(SaveForm.Result, resultListener);
            ipcRenderer.removeListener(SaveForm.Reject, rejectListener);
        };
        ipcRenderer.once(SaveForm.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(SaveForm.Reject, rejectListener);
            ipcRenderer.removeListener(SaveForm.Result, resultListener);
        };
        ipcRenderer.once(SaveForm.Reject, rejectListener);

        // /**
        //  * replyListener
        //  * @param event
        //  * @param reply
        //  */
        // const replyListener = (event: Event, reply: string) => {
        // 	// Remove Listner
        // 	// ipcRenderer.removeListener(SaveForm.Reply, replyListener);
        // };
        // ipcRenderer.once(SaveForm.Reply, replyListener);

        // TODO: ここでは送らない。started アクション処理で送る
        // ipcRenderer.send(SaveForm.Request, []);
    });
};
export const saveForm_sendFormData = (formData: IFormData) => {
    // Send
    ipcRenderer.send(SaveForm.Request, [formData]);
};
