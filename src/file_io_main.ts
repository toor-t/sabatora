//
// file_io_main
//
'use strict';
import { app, dialog, ipcMain } from 'electron';
import { win } from './main';
import { OpenForm, SaveForm } from './file_io';
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
    sleep(200, () => {
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

// TODO:
export const saveForm_request = ipcMain.on(SaveForm.Request, (event: any, arg: any) => {
    // TODO:
    console.log('saveForm_request');
    console.log(event);
    console.log(arg);
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        saveForm(arg[0]).then(
            result => {
                if (win) {
                    win.webContents.send(SaveForm.Result, result);
                }
            },
            reject => {
                // TODO:
                if (win) {
                    win.webContents.send(SaveForm.Reject, reject);
                }
            }
        );
        event.sender.send(SaveForm.Reply, 'Request received.');
    });
});

const saveForm = (state: any): Promise<{}> => {
    return new Promise((resolve, reject) => {
        if (win) {
            // ファイル保存ダイアログを表示する
            dialog.showSaveDialog(
                win,
                {
                    title: '帳票保存',
                    defaultPath: `${state.title}.json`, // TODO: 拡張子は仮

                    filters: [
                        { name: 'JSON File', extensions: ['json'] },
                        { name: 'All Files', extensions: ['*'] }
                    ]
                },
                filename => {
                    if (filename) {
                        // TODO:  保存不要なステータスを除去したステータスを用意
                        const saveState = Object.assign({}, state, { autoCompleteOptions: {} });
                        // ファイルに保存
                        const fileContent = JSON.stringify(saveState);
                        console.log(fileContent);
                        fs.writeFile(filename, fileContent, err => {
                            if (err) {
                                // TODO:
                                alert(err);
                                reject(err);
                            } else {
                                // TODO:
                                resolve({});
                            }
                        });
                    }
                }
            );
        }
    });
};
