/**
 * print_main
 */
'use strict';
import { PrintForm } from './print';
import { ipcMain } from 'electron';
import { win } from './main';

// TODO:
// setIntervalを使う方法
function sleep(waitMSec: number, callbackFunc: () => void) {
    // 経過時間（秒）
    let spanedMSec = 0;

    // 1秒間隔で無名関数を実行
    const id = setInterval(() => {
        spanedMSec += 1;

        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedMSec >= waitMSec) {
            // タイマー停止
            clearInterval(id);

            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1);
}
// TODO:
const printForm_request = ipcMain.on(PrintForm.Request, (event: any, arg: any) => {
    // TODO:
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        printForm().then(
            result => {
                if (win) {
                    win.webContents.send(PrintForm.Result, result);
                }
            },
            reject => {
                // TODO:
                if (win) {
                    win.webContents.send(PrintForm.Reject, reject);
                }
            }
        );
        event.sender.send(PrintForm.Reply, 'Request received.');
    });
});

const printForm = (): Promise<{}> => {
    return new Promise((resolve, reject) => {
        if (win) {
            //
            win.webContents.print(
                { silent: false, printBackground: false, deviceName: '' },
                (success: boolean) => {
                    if (!success) {
                        // TODO:  失敗した場合エラー表示する
                        console.log('帳票印刷失敗');
                        reject('印刷失敗');
                    }
                    console.log('印刷終了');
                    resolve('印刷完了');
                }
            );
            console.log('webContents.print() end!!');
        } else {
            // TODO:
            reject('印刷異常終了');
        }
    });
};
