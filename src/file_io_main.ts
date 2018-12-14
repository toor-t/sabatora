/**
 * file_io_main
 */
'use strict';
import { dialog, ipcMain, Event } from 'electron';
import { win } from './main';
import { OpenForm, SaveForm } from './file_io';
import * as fs from 'fs';
import { IFormData } from './states/CreateFormState';

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
/**
 * 帳票読込リクエスト待ち受け
 */
const openForm_request = ipcMain.on(OpenForm.Request, (event: Event, arg: any) => {
    // TODO:
    event.sender.send(OpenForm.Reply, 'Request received.');
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        const asyncFunc = async () => {
            if (win) {
                try {
                    const result = await openForm();
                    win.webContents.send(OpenForm.Result, result);
                } catch (reject) {
                    // TODO:
                    win.webContents.send(OpenForm.Reject, reject);
                }
            }
        };
        asyncFunc().then();
    });
});

/**
 * 帳票読込
 */
const openForm = (): Promise<Buffer> => {
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
                    // console.log(filename);
                    if (filename && filename[0]) {
                        // console.log(filename[0]);
                        // ファイルオープン
                        fs.readFile(filename[0], (err, data) => {
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
                    } else {
                        // キャンセルされた
                        console.log('Canceled.');
                        reject('CANCELED'); // TODO:
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
/**
 * 帳票保存リクエスト待ち受け
 */
const saveForm_request = ipcMain.on(SaveForm.Request, (event: Event, arg: any) => {
    event.sender.send(SaveForm.Reply, 'Request received.');
    // TODO: 実験：waitしてみる
    sleep(200, () => {
        const asyncFunc = async () => {
            if (win) {
                try {
                    const result = await saveForm(arg[0]);
                    win.webContents.send(SaveForm.Result, result);
                } catch (reject) {
                    win.webContents.send(SaveForm.Reject, reject);
                }
            }
        };
        asyncFunc().then();
    });
});

/**
 * 帳票保存
 * @param formData
 */
const saveForm = (formData: IFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (win) {
            // ファイル保存ダイアログを表示する
            dialog.showSaveDialog(
                win,
                {
                    title: '帳票保存',
                    defaultPath: `${formData.title}.json`, // TODO: 拡張子は仮

                    filters: [
                        { name: 'JSON File', extensions: ['json'] },
                        { name: 'All Files', extensions: ['*'] }
                    ]
                },
                filename => {
                    // console.log(filename);
                    if (filename) {
                        // TODO:  保存不要なステータスを除去したステータスを用意
                        const saveFormData = Object.assign({}, formData);
                        // ファイルに保存
                        const fileContent = JSON.stringify(saveFormData);
                        // console.log(fileContent);
                        fs.writeFile(filename, fileContent, err => {
                            if (err) {
                                // TODO:
                                alert(err);
                                reject(err);
                            } else {
                                // TODO:
                                resolve();
                            }
                        });
                    } else {
                        reject('CANCELED');
                    }
                }
            );
        }
    });
};
