//
// file_io_renderer
//
'use strict';
import { ipcRenderer } from 'electron';
import { OpenForm } from './file_io';

// OpenForm
export const openForm = (): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const resultListener = (event: any, result: any) => {
            // console.log(`OpenForm-result=${{ ...result }}`);
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(OpenForm.Result, resultListener);
            ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
        };
        ipcRenderer.once(OpenForm.Result, resultListener);
        const rejectListener = (event: any, result: any) => {
            // console.log(`OpenForm-result=${{ ...result }}`);
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(OpenForm.Reject, rejectListener);
            ipcRenderer.removeListener(OpenForm.Result, resultListener);
        };
        ipcRenderer.once(OpenForm.Reject, rejectListener);
        const replyListener = (event: any, reply: any) => {
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
