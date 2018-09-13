const ReactDataGrid = require('react-data-grid');
const React = require('react');

class Example extends React.Component {
    constructor(props: any, context: any) {
        super(props, context);
        this.createRows();
        this._columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' }
        ];

        this.state = null;
    }

    createRows = () => {
        const rows = [];
        // tslint:disable-next-line:no-increment-decrement
        for (let i = 1; i < 1000; i++) {
            rows.push({
                id: i,
                // tslint:disable-next-line:prefer-template
                title: 'Title ' + i,
                count: i * 1000
            });
        }

        this._rows = rows;
    };

    rowGetter = (i: any) => {
        return this._rows[i];
    };

    render() {
        return (
            <ReactDataGrid
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowsCount={this._rows.length}
                minHeight={200}
            />
        );
    }
}

export default Example;
