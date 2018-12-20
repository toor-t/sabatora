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
        const resultListener = (event: Event, result: Buffer) => {
            // console.log(`OpenForm-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(OpenForm.Result, resultListener);
            ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
        };
        ipcRenderer.once(OpenForm.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`OpenForm-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
            ipcRenderer.removeListener(OpenForm.Result, resultListener);
        };
        ipcRenderer.once(OpenForm.Reject, rejectListener);
        const replyListener = (event: Event, reply: string) => {
            /* TODO: */
            // console.log(`OpenForm-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(OpenForm.Reply, replyListener);
        };
        ipcRenderer.once(OpenForm.Reply, replyListener);
        //
        // console.log('Send OpenForm-request');
        ipcRenderer.send(OpenForm.Request, []);
    });
};

// SaveForm
export const saveForm = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: Event, result: void) => {
            // console.log(`SaveForm-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(SaveForm.Result, resultListener);
            ipcRenderer.removeListener(SaveForm.Reject, rejectListener);
        };
        ipcRenderer.once(SaveForm.Result, resultListener);
        const rejectListener = (event: Event, result: Error) => {
            // console.log(`SaveForm-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(SaveForm.Reject, rejectListener);
            ipcRenderer.removeListener(SaveForm.Result, resultListener);
        };
        ipcRenderer.once(SaveForm.Reject, rejectListener);
        const replyListener = (event: Event, reply: string) => {
            /* TODO: */
            // console.log(`SaveForm-reply = ${reply}`);
            // Remove Listner
            ipcRenderer.removeListener(SaveForm.Reply, replyListener);
        };
        ipcRenderer.once(SaveForm.Reply, replyListener);
        //
        // console.log('Send SaveForm-request');
        // TODO: ここでは送らない。started アクション処理で送る
        // ipcRenderer.send(SaveForm.Request, []);
    });
};
export const saveForm_sendFormData = (formData: IFormData) => {
    ipcRenderer.send(SaveForm.Request, [formData]);
};
