'use strict';
import { remote } from 'electron';

const DataStore = remote.require('nedb');

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

//
// export const dataFind = (query: Object, projection: Object) => {
// 	new Promise((resolve, reject) => {
// 		console.log(`query=`);
// 		console.log(query);
// 		console.log(`projectionKeyName=${projectionKeyName}`);
// 		data_db.find(query, { [projectionKeyName]: 1 }, (err, docs: any[]) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				const newDocs: string[] = [];
// 				for (let i = 0; i < docs.length; i = i + 1) {
// 					const doc = docs[i];
// 					newDocs.push(doc[projectionKeyName]);
// 				}
// 				const result = Array.from(new Set(newDocs)).sort();
// 				const _autoCompleteOptions: {}[] = [];
// 				for (let i = 0; i < result.length; i = i + 1) {
// 					_autoCompleteOptions.push({
// 						id: i,
// 						title: result[i]
// 					});
// 				}
// 				// console.log(`_autoCompleteOptions=${_autoCompleteOptions}`);
// 				prevAutoCompleteOptions = _autoCompleteOptions.slice();

// 				resolve(_autoCompleteOptions);
// 			}
// 		}
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
        data_db.insert(doc, (err: Error, newdoc: DataDoc) => {});
    }
}
