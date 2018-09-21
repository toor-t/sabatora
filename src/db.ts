'use strict';
import { remote } from 'electron';

const DataStore = remote.require('nedb');

export interface DataDoc {
    // TODO:
    level_1: string; // 大1
    level_2: string; // 中2
    level_3: string; // 小3
    itemName: string; // 名称
    unitPrice: number[]; // 単価
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
