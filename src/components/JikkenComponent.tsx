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
        name: 'ID',
        width: 80
    },
    {
        key: 'task',
        name: 'Title',
        editable: true
    },
    {
        key: 'priority',
        name: 'Priority',
        editable: true
    },
    {
        key: 'issueType',
        name: 'Issue Type',
        editable: true
    },
    {
        key: 'complete',
        name: '% Complete',
        editable: true
    },
    {
        key: 'startDate',
        name: 'Start Date',
        editable: true
    },
    {
        key: 'completeDate',
        name: 'Expected Complete',
        editable: true
    }
];

let rows: {}[];

const createRows = (numberOfRows: number) => {
    const rows = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 1; i < numberOfRows; i++) {
        rows.push({
            id: i,
            // tslint:disable-next-line:prefer-template
            task: 'Task ' + i,
            complete: Math.min(100, Math.round(Math.random() * 110)),
            priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 3 + 1)],
            issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 3 + 1)],
            startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
            completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
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
        rows = createRows(1000);
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
