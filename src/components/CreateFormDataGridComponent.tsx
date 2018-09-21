'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
// autoCompleteOptions = [{ id: 1, title: 'へへへ' }, { id: 2, title: 'ゆかい' }, { id: 3, title: 'だぜ' }];
autoCompleteOptions = [];
for (let i = 0; i < 100; i = i + 1) {
    autoCompleteOptions.push({ id: i, title: `${i}` });
}
export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
}

const _columns = [
    {
        key: 'id',
        name: 'No.',
        width: 80
    },
    {
        key: 'level_1',
        name: '大分類',
        editor: <AutoCompleteEditor options={autoCompleteOptions} />
    },
    {
        key: 'level_2',
        name: '中分類',
        editor: <AutoCompleteEditor options={autoCompleteOptions} />
    },
    {
        key: 'level_3',
        name: '小分類',
        editor: <AutoCompleteEditor options={autoCompleteOptions} />
    },
    {
        key: 'itemName',
        name: '名称',
        editor: <AutoCompleteEditor options={autoCompleteOptions} />
    },
    {
        key: 'unitPrice',
        name: '単価',
        editor: <AutoCompleteEditor options={autoCompleteOptions} />
    },
    {
        key: 'num',
        name: '個数',
        editable: true
    },
    {
        key: 'price',
        name: '価格',
        editable: false
    }
];

let rows: {}[];

const rowGetter = (i: number) => {
    return rows[i];
};

const handleGridRowsUpdated = (e: any) => {
    const _rows = rows.slice();

    // tslint:disable-next-line:no-increment-decrement
    for (let i = e.fromRow; i <= e.toRow; i++) {
        const rowToUpdate = rows[i];
        const updatedRow = immutabilityHelper(rowToUpdate, { $merge: e.updated });
        _rows[i] = updatedRow;
    }

    rows = _rows;
};

// const getRandomDate = (start: any, end: any) => {
//     return new Date(
//         start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     ).toLocaleDateString();
// };

const CreateFormDataGridComponent: React.SFC<ICreateFormDataGridComponentProps> = props => {
    if (props.rows !== undefined) {
        rows = props.rows;
    }
    return (
        <ReactDataGrid
            enableCellSelect={true}
            columns={_columns}
            rowGetter={rowGetter}
            rowsCount={rows.length}
            minHeight={500}
            onGridRowsUpdated={/*props.onGridRowUpdate*/ handleGridRowsUpdated}
        />
    );
};

export default CreateFormDataGridComponent;
