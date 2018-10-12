//
// file_io_main
//
'use strict';
import { app, dialog, ipcMain } from 'electron';
import { win } from './main';
import { OpenForm } from './file_io';
import * as fs from 'fs';

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
export const openForm_request = ipcMain.on(OpenForm.Request, (event: any, arg: any) => {
    // TODO:
    // TODO: 実験：waitしてみる
    sleep(300, () => {
        openForm().then(
            result => {
                if (win) {
                    win.webContents.send(OpenForm.Result, result);
                }
            },
            reject => {
                // TODO:
                if (win) {
                    win.webContents.send(OpenForm.Reject, reject);
                }
            }
        );
        event.sender.send(OpenForm.Reply, 'Request received.');
    });
});

const openForm = (): Promise<{}> => {
    return new Promise((resolve, reject) => {
        if (win) {
            // ファイル読込ダイアログを表示する
            dialog.showOpenDialog(
                win,
                {
                    title: '帳票読込',
                    filters: [
                        { name: 'JSON File', extensions: ['json'] }, // TODO: 拡張子は仮
                        { name: 'All Files', extensions: ['*'] }
                    ]
                },
                filename => {
                    if (filename[0]) {
                        console.log(filename[0]);
                        // ファイルオープン
                        const data = fs.readFile(filename[0], (err, data) => {
                            if (err) {
                                // エラー
                                // TODO:
                                reject(err);
                            } else {
                                // ファイル読込完了
                                // TODO: ここでファイル内容の確認が必要か？
                                resolve(data);
                            }
                        });
                    }
                }
            );
        } else {
            // TODO:
            reject({});
        }
    });
};
