//
// db_main
//
'use strict';
import { ipcMain } from 'electron';
import * as DataStore from 'nedb';
import { win } from './main';

export namespace DataDocKeys {
    export const level_1 = 'level_1';
    export const level_2 = 'level_2';
    export const level_3 = 'level_3';
    export const itemName = 'itemName';
    export const unitPrice = 'unitPrice';
}

export interface DataDoc {
    // TODO:
    [DataDocKeys.level_1]: string; // 大1
    [DataDocKeys.level_2]: string; // 中2
    [DataDocKeys.level_3]: string; // 小3
    [DataDocKeys.itemName]: string; // 名称
    [DataDocKeys.unitPrice]: number[]; // 単価
}

export interface ConfDoc {
    // TODO:
}

export const data_db: Nedb = new DataStore({
    filename: './db/data.db', // TODO:  ファイル名
    autoload: true
    /*
	afterSerialization: hoge,
	beforeDeserialization: fuga,
	*/
});
export const conf_db: Nedb = new DataStore({
    filename: './db/conf.db', // TODO: ファイル名
    autoload: true
});

// TODO:
export const updateAutoCompleteOptions_request = ipcMain.on(
    'updateAutoCompleteOptions-request',
    (event: any, arg: any) => {
        // TODO:
        // console.log(`updateAutoCompleteOptions-request=${arg}`);
        updateAutoCompleteOptions(arg[0], arg[1]).then(
            result => {
                if (win) {
                    win.webContents.send('updateAutoCompleteOptions-result', result);
                }
            },
            reject => {
                // TODO:
                if (win) {
                    win.webContents.send('updateAutoCompleteOptions-reject', reject);
                }
            }
        );
        event.sender.send('updateAutoCompleteOptions-reply', 'Request received.');
    }
);

export const updateAutoCompleteOptions = (query: any, projection: string[] = []): Promise<{}> => {
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
