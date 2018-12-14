/**
 * print_main
 */
'use strict';
import { PrintForm } from './print';
import { ipcMain, Event } from 'electron';
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

/**
 * 帳票印刷リクエスト待ち受け
 */
const printForm_request = ipcMain.on(PrintForm.Request, (event: Event, arg: any) => {
    // TODO:
    event.sender.send(PrintForm.Reply, 'Request received.');
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        const asyncFunc = async () => {
            if (win) {
                try {
                    const result = await printForm();
                    win.webContents.send(PrintForm.Result, result);
                } catch (reject) {
                    // TODO:
                    win.webContents.send(PrintForm.Reject, reject);
                }
            } else {
                // TODO: 以上状態
            }
        };
        asyncFunc().then();
    });
});

/**
 * 帳票印刷
 */
const printForm = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (win) {
            // 印刷処理
            win.webContents.print(
                { silent: false, printBackground: false, deviceName: '' },
                (success: boolean) => {
                    if (success) {
                        console.log('印刷終了');
                        resolve('印刷完了');
                    } else {
                        // TODO:  失敗した場合エラー表示する
                        console.log('帳票印刷失敗');
                        reject('印刷失敗');
                    }
                }
            );
        } else {
            // TODO:
            reject('印刷異常終了');
        }
    });
};
