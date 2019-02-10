/**
 * db_main
 */

import { app, ipcMain, Event } from 'electron';
import * as DataStore from 'nedb';

import {
    DataDocKeys,
    DataDoc,
    ConfDoc,
    UpdateAutoCompleteOptions,
    QueryDb,
    UpdateDb,
    InsertDb,
    RemoveDb,
    autoCompleteOptionsType
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
ipcMain.on(QueryDb.Request, (event: Event, arg: [DataDoc, (keyof DataDoc)[]]) => {
    // TODO:
    const asyncFunc = async () => {
        try {
            const result = await queryDb(arg[0], arg[1]);
            event.sender.send(QueryDb.Result, [result, null]);
        } catch (reject) {
            // TODO:
            event.sender.send(QueryDb.Result, [null, reject]);
        }
    };
    asyncFunc().then();
});
/**
 * Query DB
 * @param query
 * @param projection
 */
const queryDb = (query: DataDoc, projection: (keyof DataDoc)[] = []): Promise<DataDoc[]> => {
    return new Promise((resolve, reject) => {
        // query生成
        let _query: Partial<DataDoc> = {};
        for (const key in query) {
            switch (key) {
                /**
                 * level
                 */
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                /**
                 * itemName
                 */
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        // TODO: '' との比較で良いのか?
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                /**
                 * unitPrice
                 */
                case DataDocKeys.unitPrice:
                    // TODO: 何もしないで良いか？
                    break;
                default:
                    // 何もしない
                    break;
            }
        }
        // projection生成
        let _projection: Partial<DataDoc> = {};
        projection.map((value, index, array) => {
            switch (value) {
                /**
                 * level
                 */
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                /**
                 * itemName
                 */
                case DataDocKeys.itemName:
                /**
                 * unitPrice
                 */
                case DataDocKeys.unitPrice:
                    _projection = Object.assign(_projection, { [value]: 1 });
                    break;

                default:
                    // もし他のキーが含まれていても無視する
                    break;
            }
        });
        const _sortQuery: { [P in keyof DataDoc]?: number } = {
            /**
             * level
             */
            [DataDocKeys.level_1]: 1,
            [DataDocKeys.level_2]: 1,
            [DataDocKeys.level_3]: 1,
            /**
             * itemName
             */
            [DataDocKeys.itemName]: 1
        };
        data_db
            .find(_query, _projection as DataDoc)
            .sort(_sortQuery)
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
ipcMain.on(UpdateDb.Request, (event: Event, arg: [DataDoc, DataDoc]) => {
    const asyncFunc = async () => {
        try {
            // TODO:
            const result = await updateDb(arg[0], arg[1]);
            event.sender.send(UpdateDb.Result, [result, null]);
        } catch (reject) {
            // TODO:
            event.sender.send(UpdateDb.Result, [null, reject]);
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
        let _query: Partial<DataDoc> = {};
        for (const key in query) {
            switch (key) {
                /**
                 * level
                 */
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                /**
                 * itemName
                 */
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        // TODO: ''との比較で良いか？
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                /**
                 * unitPrice
                 */
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
ipcMain.on(InsertDb.Request, (event: Event, arg: [DataDoc]) => {
    const asyncFunc = async () => {
        try {
            // TODO:
            const result = await insertDb(arg[0]);
            event.sender.send(InsertDb.Result, [result, null]);
        } catch (reject) {
            // TODO:
            event.sender.send(InsertDb.Result, [null, reject]);
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
ipcMain.on(RemoveDb.Request, (event: Event, arg: [DataDoc]) => {
    const asyncFunc = async () => {
        try {
            // TODO:
            const result = await removeDb(arg[0]);
            event.sender.send(RemoveDb.Result, [result, null]);
        } catch (reject) {
            // TODO:
            event.sender.send(RemoveDb.Result, [null, reject]);
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
ipcMain.on(UpdateAutoCompleteOptions.Request, (event: Event, arg: [DataDoc, (keyof DataDoc)[]]) => {
    const asyncFunc = async () => {
        try {
            // TODO:
            const result = await updateAutoCompleteOptions(arg[0], arg[1]);
            event.sender.send(UpdateAutoCompleteOptions.Result, [result, null]);
        } catch (reject) {
            // TODO:
            event.sender.send(UpdateAutoCompleteOptions.Result, [null, reject]);
        }
    };
    asyncFunc().then();
});
/**
 * Update AutoCompleteOptions
 * @param query
 * @param projection
 */
const updateAutoCompleteOptions = (
    query: DataDoc,
    projection: (keyof DataDoc)[] = []
): Promise<autoCompleteOptionsType> => {
    return new Promise((resolve, reject) => {
        // query生成
        let _query: Partial<DataDoc> = {};
        for (const key in query) {
            switch (key) {
                /**
                 * level
                 */
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                /**
                 * itemName
                 */
                case DataDocKeys.itemName:
                    if (query[key] !== '') {
                        _query = Object.assign(_query, { [key]: query[key] });
                    }
                    break;
                /**
                 * unitPrice
                 */
                case DataDocKeys.unitPrice:
                    // TODO: 何もしないで良いか？
                    break;

                default:
                    // 何もしない
                    break;
            }
        }
        // projection生成
        let _projection: Partial<DataDoc> = {};
        projection.map((value, index, array) => {
            switch (value) {
                /**
                 * level
                 */
                case DataDocKeys.level_1:
                case DataDocKeys.level_2:
                case DataDocKeys.level_3:
                /**
                 * itemName
                 */
                case DataDocKeys.itemName:
                /**
                 * unitPrice
                 */
                case DataDocKeys.unitPrice:
                    _projection = Object.assign(_projection, { [value]: 1 });
                    break;
                default:
                    break;
            }
        });
        data_db.find(_query, _projection as DataDoc, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                let projectionKeys = projection;
                if (projectionKeys.length === 0) {
                    projectionKeys = [
                        /**
                         * level
                         */
                        DataDocKeys.level_1,
                        DataDocKeys.level_2,
                        DataDocKeys.level_3,
                        /**
                         * itemName
                         */
                        DataDocKeys.itemName,
                        /**
                         * unitPrice
                         */
                        DataDocKeys.unitPrice
                    ];
                }
                let autoCompleteOptions: autoCompleteOptionsType = {};
                projectionKeys.map((currentKey, index, array) => {
                    let result: string[] = [];
                    switch (currentKey) {
                        /**
                         * level
                         */
                        case DataDocKeys.level_1:
                        case DataDocKeys.level_2:
                        case DataDocKeys.level_3:
                        /**
                         * itemName
                         */
                        case DataDocKeys.itemName:
                            const newDocs: string[] = [];
                            for (let i = 0; i < docs.length; i = i + 1) {
                                const doc = docs[i];
                                newDocs.push(doc[currentKey]);
                            }
                            result = Array.from(new Set(newDocs)).sort();

                            break;

                        /**
                         * unitPrice
                         */
                        case DataDocKeys.unitPrice:
                            if (docs.length !== 1) {
                                // 複数候補がある場合は無視する
                                return;
                            }
                            result = docs[0][currentKey].map((value, index, array) => {
                                return value.toString();
                            });

                            break;

                        /**
                         * _id
                         */
                        case DataDocKeys._id:
                            // _id は無視
                            break;

                        default:
                            break;
                    }

                    const _options: { id: number; title: string }[] = [];
                    for (let i = 0; i < result.length; i = i + 1) {
                        _options.push({
                            id: i,
                            title: result[i]
                        });
                    }
                    autoCompleteOptions = Object.assign(autoCompleteOptions, {
                        [currentKey]: _options
                    });
                });
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
