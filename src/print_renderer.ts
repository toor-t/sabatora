/**
 * print renderer
 */
'use strict';
import { PrintForm } from './print';
import { ipcRenderer, Event } from 'electron';

// TODO:
// PrintForm
export const printForm = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        /**
         * resultListener
         * @param event
         * @param result
         */
        const resultListener = (event: Event, result: void) => {
            resolve(result);

            // Remove Listner
            // ipcRenderer.removeListener(PrintForm.Result, resultListener);
            ipcRenderer.removeListener(PrintForm.Reject, rejectListener);
        };
        ipcRenderer.once(PrintForm.Result, resultListener);

        /**
         * rejectListener
         * @param event
         * @param result
         */
        const rejectListener = (event: Event, result: Error) => {
            reject(result);

            // Remove Listner
            // ipcRenderer.removeListener(PrintForm.Reject, rejectListener);
            ipcRenderer.removeListener(PrintForm.Result, resultListener);
        };
        ipcRenderer.once(PrintForm.Reject, rejectListener);

        // Send
        ipcRenderer.send(PrintForm.Request, []);
    });
};
