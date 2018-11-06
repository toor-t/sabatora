/**
 * db_main
 */
'use strict';
import { app, ipcMain } from 'electron';
import * as DataStore from 'nedb';
import { win } from './main';

import {
    DataDocKeys,
    DataDoc,
    ConfDoc,
    UpdateAutoCompleteOptions,
    QueryDb,
    UpdateDb,
    InsertDb,
    RemoveDb
} from './db';

const userDataPath = app.getPath('userData');
// const userDataPath = './db';
console.log(`userDataPath=${userDataPath}`);

const data_db: Nedb = new DataStore({
    filename: `${userDataPath}/data.db`, // TODO:  ファイル名
    autoload: true
    /*
	afterSerialization: hoge,
	beforeDeserialization: fuga,
	*/
});
// TODO: auto compaction
data_db.persistence.setAutocompactionInterval(60000);

const conf_db: Nedb = new DataStore({
    filename: `${userDataPath}/conf.db`, // TODO: ファイル名
    autoload: true
});

// TODO:
const queryDb_request = ipcMain.on(QueryDb.Request, (event: any, arg: any) => {
    // TODO:
    queryDb(arg[0], arg[1]).then(
        result => {
            if (win) {
                win.webContents.send(QueryDb.Result, result);
            }
        },
        reject => {
            // TODO:
            if (win) {
                win.webContents.send(QueryDb.Reject, reject);
            }
        }
    );
    event.sender.send(QueryDb.Reply, 'Request received.');
});
const queryDb = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        // query生成
        let _query = {};
        for (const key in query) {
            switch (key) {
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                case DataDocKeys.unitPrice:
                    // TODO: 何もしないで良いか？
                    break;
                default:
                    // 何もしない
                    break;
            }
        }
        // console.log('_query=');
        // console.log(_query);
        // projection生成
        let _projection = {};
        for (const key in projection) {
            switch (projection[key]) {
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                case DataDocKeys.itemName:
                case DataDocKeys.unitPrice:
                    _projection = Object.assign(_projection, { [projection[key]]: 1 });
                    break;
                default:
                    break;
            }
        }
        // console.log('_projection');
        // console.log(_projection);
        data_db
            .find(_query, _projection)
            .sort({
                [DataDocKeys.level_1]: 1,
                [DataDocKeys.level_2]: 1,
                [DataDocKeys.level_3]: 1,
                [DataDocKeys.itemName]: 1
            })
            .exec((err, docs: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
    });
};

// TODO: UpdateDb
const updateDb_request = ipcMain.on(UpdateDb.Request, (event: any, arg: any) => {
    // TODO:
    updateDb(arg[0], arg[1]).then(
        result => {
            if (win) {
                win.webContents.send(UpdateDb.Result, result);
            }
        },
        reject => {
            // TODO:
            if (win) {
                win.webContents.send(UpdateDb.Reject, reject);
            }
        }
    );
    event.sender.send(UpdateDb.Reply, 'Request received.');
});
const updateDb = (query: any, update: any): Promise<{}> => {
    return new Promise((resolve, reject) => {
        // query生成
        let _query = {};
        for (const key in query) {
            switch (key) {
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                case DataDocKeys.unitPrice:
                    // TODO: 何もしないで良いか？
                    break;
                default:
                    // 何もしない
                    break;
            }
        }
        // console.log('_query=');
        // console.log(_query);
        // projection生成
        // let _projection = {};
        // for (const key in projection) {
        // 	switch (projection[key]) {
        // 		case DataDocKeys.level_1:
        // 		case DataDocKeys.level_2:
        // 		case DataDocKeys.level_3:
        // 		case DataDocKeys.itemName:
        // 		case DataDocKeys.unitPrice:
        // 			_projection = Object.assign(_projection, { [projection[key]]: 1 });
        // 			break;
        // 		default:
        // 			break;
        // 	}
        // }
        // console.log('_projection');
        // console.log(_projection);
        data_db.update(_query, update, {}, (err: any, numAffected: any, docs: any, upsert: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

// TODO: InsertDb
const insertDb_request = ipcMain.on(InsertDb.Request, (event: any, arg: any) => {
    // TODO:
    insertDb(arg[0]).then(
        result => {
            if (win) {
                win.webContents.send(InsertDb.Result, result);
            }
        },
        reject => {
            // TODO:
            if (win) {
                win.webContents.send(InsertDb.Reject, reject);
            }
        }
    );
    event.sender.send(InsertDb.Reply, 'Request received.');
});
const insertDb = (doc: any): Promise<{}> => {
    return new Promise((resolve, reject) => {
        data_db.insert(doc, (err: any, document: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(document);
            }
        });
    });
};

// TODO: RemoveDb
const removeDb_request = ipcMain.on(RemoveDb.Request, (event: any, arg: any) => {
    // TODO:
    removeDb(arg[0]).then(
        result => {
            if (win) {
                win.webContents.send(RemoveDb.Result, result);
            }
        },
        reject => {
            // TODO:
            if (win) {
                win.webContents.send(RemoveDb.Reject, reject);
            }
        }
    );
    event.sender.send(RemoveDb.Reply, 'Request received.');
});
const removeDb = (query: any): Promise<{}> => {
    return new Promise((resolve, reject) => {
        data_db.remove(query, (err: any, n: number) => {
            if (err) {
                reject(err);
            } else {
                resolve(n);
            }
        });
    });
};

// TODO:
const updateAutoCompleteOptions_request = ipcMain.on(
    UpdateAutoCompleteOptions.Request,
    (event: any, arg: any) => {
        // TODO:
        // console.log(`updateAutoCompleteOptions-request=${arg}`);
        updateAutoCompleteOptions(arg[0], arg[1]).then(
            result => {
                if (win) {
                    win.webContents.send(UpdateAutoCompleteOptions.Result, result);
                }
            },
            reject => {
                // TODO:
                if (win) {
                    win.webContents.send(UpdateAutoCompleteOptions.Reject, reject);
                }
            }
        );
        event.sender.send(UpdateAutoCompleteOptions.Reply, 'Request received.');
    }
);

const updateAutoCompleteOptions = (query: any, projection: string[] = []): Promise<{}> => {
    return new Promise((resolve, reject) => {
        // query生成
        let _query = {};
        for (const key in query) {
            switch (key) {
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                case DataDocKeys.unitPrice:
                    // TODO: 何もしないで良いか？
                    break;
                default:
                    // 何もしない
                    break;
            }
        }
        // console.log('_query=');
        // console.log(_query);
        // projection生成
        let _projection = {};
        for (const key in projection) {
            switch (projection[key]) {
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                case DataDocKeys.itemName:
                case DataDocKeys.unitPrice:
                    _projection = Object.assign(_projection, { [projection[key]]: 1 });
                    break;
                default:
                    break;
            }
        }
        // console.log('_projection');
        // console.log(_projection);
        data_db.find(_query, _projection, (err, docs: any[]) => {
            if (err) {
                reject(err);
            } else {
                // console.log('docs=');
                // console.log(docs);
                let projectionKeys = projection;
                if (projectionKeys.length === 0) {
                    projectionKeys = [
                        DataDocKeys.level_1,
                        DataDocKeys.level_2,
                        DataDocKeys.level_3,
                        DataDocKeys.itemName,
                        DataDocKeys.unitPrice
                    ];
                }
                // console.log('projectionKeys=');
                // console.log(projectionKeys);
                let autoCompleteOptions = {};
                for (const key in projectionKeys) {
                    let result: string[] = [];
                    if (projectionKeys[key] !== DataDocKeys.unitPrice) {
                        const newDocs: string[] = [];
                        for (let i = 0; i < docs.length; i = i + 1) {
                            const doc = docs[i];
                            newDocs.push(doc[projectionKeys[key]]);
                        }
                        result = Array.from(new Set(newDocs)).sort();
                    } else if (projectionKeys[key] === DataDocKeys.unitPrice) {
                        if (docs.length !== 1) {
                            // 複数候補がある場合は無視する
                            continue;
                        }
                        result = docs[0][projectionKeys[key]];
                    }

                    const _options: {}[] = [];
                    for (let i = 0; i < result.length; i = i + 1) {
                        _options.push({
                            id: i,
                            title: result[i]
                        });
                    }
                    // console.log('_options=');
                    // console.log(_options);
                    //
                    autoCompleteOptions = Object.assign(autoCompleteOptions, {
                        [projectionKeys[key]]: _options
                    });
                }
                // console.log('autoCompleteOptions=');
                // console.log(autoCompleteOptions);
                resolve(autoCompleteOptions);
            }
        });
    });
};

/***************************************/

// ダミーDB作成
export function makeDummyDB() {
    let doc: DataDoc;
    for (let i = 0; i < 10000; i = i + 1) {
        doc = {
            level_1: `大項目 ${Math.floor(Math.random() * 10 + 1)}`,
            level_2: `中項目 ${Math.floor(Math.random() * 10 + 1)}`,
            level_3: `小項目 ${Math.floor(Math.random() * 10 + 1)}`,
            itemName: `すごいもの ${i + 1}`,
            unitPrice: [(i + 1) * 100, (i + 1) * 100 + 100, (i + 1) * 100 + 200]
        };
        data_db.insert(doc, (err: Error, newdoc: DataDoc) => {
            console.log(newdoc);
        });
    }
}
