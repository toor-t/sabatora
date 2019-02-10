/**
 * print_main
 */

import { PrintForm } from './print';
import { ipcMain, Event } from 'electron';

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
ipcMain.on(PrintForm.Request, (event: Event, arg: unknown) => {
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        const asyncFunc = async () => {
            try {
                const result = await printForm(event.sender);
                event.sender.send(PrintForm.Result, [result, null]);
            } catch (reject) {
                // TODO:
                event.sender.send(PrintForm.Result, [null, reject]);
            }
        };
        asyncFunc().then();
    });
});
/**
 * 帳票印刷
 */
const printForm = (webContents: Electron.WebContents): Promise<string> => {
    return new Promise((resolve, reject) => {
        // 印刷処理
        webContents.print(
            { silent: false, printBackground: false, deviceName: '' },
            (success: boolean) => {
                if (success) {
                    resolve('印刷完了');
                } else {
                    // TODO:  失敗した場合エラー表示する
                    reject('印刷失敗');
                }
            }
        );
    });
};
