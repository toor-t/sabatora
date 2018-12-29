/**
 * print renderer
 */

import { PrintForm } from './print';
import { ipcRenderer, Event } from 'electron';

/**
 * printForm
 */
export const printForm = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        //
        ipcRenderer.once(PrintForm.Result, (event: Event, result: [void | null, Error | null]) => {
            if (result[0] !== null) {
                resolve(result[0]);
            } else {
                reject(result[1]);
            }
        });

        // Send
        ipcRenderer.send(PrintForm.Request, []);
    });
};
