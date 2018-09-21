'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import immutabilityHelper from 'immutability-helper';

export interface ICreateFormDataGridComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
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
        editable: true
    },
    {
        key: 'level_2',
        name: '中分類',
        editable: true
    },
    {
        key: 'level_3',
        name: '小分類',
        editable: true
    },
    {
        key: 'itemName',
        name: '名称',
        editable: true
    },
    {
        key: 'unitPrice',
        name: '単価',
        editable: true
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
    return (
        <ReactDataGrid
            enableCellSelect={true}
            columns={_columns}
            rowGetter={rowGetter}
            rowsCount={rows.length}
            minHeight={500}
            onGridRowsUpdated={handleGridRowsUpdated}
        />
    );
};

export default CreateFormDataGridComponent;
