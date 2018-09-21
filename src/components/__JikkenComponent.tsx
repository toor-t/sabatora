'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import immutabilityHelper from 'immutability-helper';

export interface IJikkenComponentProps {
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
        key: 'name',
        name: '名称',
        editable: true
    },
    {
        key: 'unitPrice',
        name: '単価',
        editable: true
    },
    {
        key: 'number',
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

const createRows = (numberOfRows: number) => {
    const rows = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 1; i <= numberOfRows; i++) {
        rows.push({
            id: i,
            // tslint:disable-next-line:prefer-template
            level_1: '大分類 ' + i,
            // tslint:disable-next-line:prefer-template
            level_2: '中分類 ' + i,
            // tslint:disable-next-line:prefer-template
            level_3: '小分類 ' + i,
            // tslint:disable-next-line:prefer-template
            name: 'すごいもの ' + i,
            unitPrice: i * 10,
            key: Math.floor(Math.random() * 100 + 1),
            price: 0
        });
    }
    return rows;
};

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

const getRandomDate = (start: any, end: any) => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString();
};

class JikkenComponent extends React.Component {
    constructor(props: any, context: any) {
        super(props, context);
        rows = createRows(10000);
    }

    render() {
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
    }
}

export default JikkenComponent;
