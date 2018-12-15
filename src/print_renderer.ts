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
        const resultListener = (event: Event, result: any) => {
            resolve(result);

            // Remove Listner
            ipcRenderer.removeListener(PrintForm.Result, resultListener);
            ipcRenderer.removeListener(PrintForm.Reject, rejectListener);
        };
        ipcRenderer.once(PrintForm.Result, resultListener);
        const rejectListener = (event: Event, result: any) => {
            reject(result);

            // Remove Listner
            ipcRenderer.removeListener(PrintForm.Reject, rejectListener);
            ipcRenderer.removeListener(PrintForm.Result, resultListener);
        };
        ipcRenderer.once(PrintForm.Reject, rejectListener);
        const replyListener = (event: Event, reply: any) => {
            /* TODO: */
            // // TODO: 実験 リプライ時にresolve扱いにしてみる。キャンセル時処理のため。->ダメでした。
            // resolve(reply);

            // Remove Listner
            ipcRenderer.removeListener(PrintForm.Reply, replyListener);
        };
        ipcRenderer.once(PrintForm.Reply, replyListener);
        //
        ipcRenderer.send(PrintForm.Request, []);
    });
};
