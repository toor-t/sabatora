/**
 * db_main
 */
'use strict';
import { app, ipcMain, Event } from 'electron';
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
/**
 * Query DB Request listener
 */
const queryDb_request = ipcMain.on(QueryDb.Request, (event: Event, arg: any[]) => {
    // TODO:
    const asyncFunc = async () => {
        event.sender.send(QueryDb.Reply, 'Request received.');
        try {
            const result = await queryDb(arg[0], arg[1]);
            if (win) {
                win.webContents.send(QueryDb.Result, result);
            }
        } catch (reject) {
            // TODO:
            if (win) {
                win.webContents.send(QueryDb.Reject, reject);
            }
        }
    };
    asyncFunc().then();
});
/**
 * Query DB
 * @param query
 * @param projection
 */
const queryDb = (query: DataDoc, projection: string[] = []): Promise<DataDoc[]> => {
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
        data_db
            .find<DataDoc>(_query, _projection as DataDoc)
            .sort({
                [DataDocKeys.level_1]: 1,
                [DataDocKeys.level_2]: 1,
                [DataDocKeys.level_3]: 1,
                [DataDocKeys.itemName]: 1
            })
            .exec((err, docs: DataDoc[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
    });
};

// TODO:
/**
 * Update DB Request listener
 */
const updateDb_request = ipcMain.on(UpdateDb.Request, (event: Event, arg: any) => {
    const asyncFunc = async () => {
        event.sender.send(UpdateDb.Reply, 'Request received.');
        try {
            // TODO:
            const result = await updateDb(arg[0], arg[1]);
            if (win) {
                win.webContents.send(UpdateDb.Result, result);
            }
        } catch (reject) {
            // TODO:
            if (win) {
                win.webContents.send(UpdateDb.Reject, reject);
            }
        }
    };
    asyncFunc().then();
});
/**
 * Update DB
 * @param query
 * @param update
 */
const updateDb = (query: DataDoc, update: DataDoc): Promise<DataDoc[]> => {
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
        data_db.update<DataDoc>(
            _query,
            update,
            {},
            (err: Error, numAffected: number, docs: DataDoc[], upsert: boolean) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            }
        );
    });
};

// TODO:
/**
 * Insert DB Request listener
 */
const insertDb_request = ipcMain.on(InsertDb.Request, (event: Event, arg: any) => {
    const asyncFunc = async () => {
        event.sender.send(InsertDb.Reply, 'Request received.');
        try {
            // TODO:
            const result = await insertDb(arg[0]);
            if (win) {
                win.webContents.send(InsertDb.Result, result);
            }
        } catch (reject) {
            // TODO:
            if (win) {
                win.webContents.send(InsertDb.Reject, reject);
            }
        }
    };
    asyncFunc().then();
});
/**
 * Insert DB
 * @param doc
 */
const insertDb = (doc: DataDoc): Promise<DataDoc> => {
    return new Promise((resolve, reject) => {
        data_db.insert<DataDoc>(doc, (err: Error, document: DataDoc) => {
            if (err) {
                reject(err);
            } else {
                resolve(document);
            }
        });
    });
};

// TODO:
/**
 * Remove DB Request listener
 */
const removeDb_request = ipcMain.on(RemoveDb.Request, (event: Event, arg: any) => {
    const asyncFunc = async () => {
        event.sender.send(RemoveDb.Reply, 'Request received.');
        try {
            // TODO:
            const result = await removeDb(arg[0]);
            if (win) {
                win.webContents.send(RemoveDb.Result, result);
            }
        } catch (reject) {
            // TODO:
            if (win) {
                win.webContents.send(RemoveDb.Reject, reject);
            }
        }
    };
    asyncFunc().then();
});
/**
 * Remove DB
 * @param query
 */
const removeDb = (query: DataDoc): Promise<number> => {
    return new Promise((resolve, reject) => {
        data_db.remove(query, (err: Error, n: number) => {
            if (err) {
                reject(err);
            } else {
                resolve(n);
            }
        });
    });
};

// TODO:
/**
 * Update AutoCompleteOptions Request listener
 */
const updateAutoCompleteOptions_request = ipcMain.on(
    UpdateAutoCompleteOptions.Request,
    (event: Event, arg: any) => {
        const asyncFunc = async () => {
            event.sender.send(UpdateAutoCompleteOptions.Reply, 'Request received.');
            try {
                // TODO:
                const result = await updateAutoCompleteOptions(arg[0], arg[1]);
                if (win) {
                    win.webContents.send(UpdateAutoCompleteOptions.Result, result);
                }
            } catch (reject) {
                // TODO:
                if (win) {
                    win.webContents.send(UpdateAutoCompleteOptions.Reject, reject);
                }
            }
        };
        asyncFunc().then();
    }
);
/**
 * Update AutoCompleteOptions
 * @param query
 * @param projection
 */
const updateAutoCompleteOptions = (query: DataDoc, projection: string[] = []): Promise<{}> => {
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
        data_db.find<DataDoc>(_query, _projection as DataDoc, (err, docs: DataDoc[]) => {
            if (err) {
                reject(err);
            } else {
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
                let autoCompleteOptions = {};
                for (const key in projectionKeys) {
                    let result: string[] = [];
                    const currentKey = projectionKeys[key];
                    if (currentKey !== DataDocKeys.unitPrice) {
                        const newDocs: string[] = [];
                        for (let i = 0; i < docs.length; i = i + 1) {
                            const doc = docs[i];
                            newDocs.push(doc[currentKey] as string);
                        }
                        result = Array.from(new Set(newDocs)).sort();
                    } else if (currentKey === DataDocKeys.unitPrice) {
                        if (docs.length !== 1) {
                            // 複数候補がある場合は無視する
                            continue;
                        }
                        result = docs[0][currentKey].map((value, index, array) => {
                            return value.toString();
                        });
                    }

                    const _options: {}[] = [];
                    for (let i = 0; i < result.length; i = i + 1) {
                        _options.push({
                            id: i,
                            title: result[i]
                        });
                    }
                    autoCompleteOptions = Object.assign(autoCompleteOptions, {
                        [projectionKeys[key]]: _options
                    });
                }
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
