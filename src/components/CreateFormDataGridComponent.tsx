'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
autoCompleteOptions = [];

const getOptions = (): { id: number; title: string }[] => {
    console.log('Call getOptions()');
    console.log(autoCompleteOptions);
    return autoCompleteOptions;
};
// for (let i = 0; i < 100; i = i + 1) {
// 	autoCompleteOptions.push({ id: i, title: `${i}` });
// }

interface IMyAutoComleteEditorStates {
    options: { id: number; title: string }[];
}

// interface IMyAutoCompleteEditorProps {
// 	autoCompleteOptions: { id: number; title: string }[];
// }
class MyAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    any,
    IMyAutoComleteEditorStates
> {
    constructor(props: any) {
        super(props);
        // const { options } = this.props;
        this.state = {
            options: autoCompleteOptions
        };
    }
    render() {
        const { options, ...rest } = this.props;
        return (
            <AutoCompleteEditor
                // tslint:disable-next-line:jsx-no-lambda
                onFocus={() => this.setState({ options: autoCompleteOptions })}
                options={this.state.options}
                {...rest}
            />
        );
    }
}

// const MyAutoCompleteEditor = <AutoCompleteEditor options={getOptions()} />;

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
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
        editor: <MyAutoCompleteEditor />
    },
    {
        key: 'level_2',
        name: '中分類',
        editor: <MyAutoCompleteEditor />
    },
    {
        key: 'level_3',
        name: '小分類',
        editor: <MyAutoCompleteEditor />
    },
    {
        key: 'itemName',
        name: '名称',
        editor: <MyAutoCompleteEditor />
    },
    {
        key: 'unitPrice',
        name: '単価',
        editor: <MyAutoCompleteEditor />
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

// const getColumns = (_options: { id: number; title: string }[] | undefined) => {
// 	console.log(`Call getColumns(${_options})`);
// 	const __options = _options !== undefined ? _options : [];
// 	const options = __options;// [{ id: 0, title: new Date().getSeconds().toString() }];
// 	console.log(options);
// 	return [
// 		{
// 			key: 'id',
// 			name: 'No.',
// 			width: 80,
// 		},
// 		{
// 			key: 'level_1',
// 			name: '大分類',
// 			editor: MyAutoCompleteEditor
// 		},
// 		{
// 			key: 'level_2',
// 			name: '中分類',
// 			editor: MyAutoCompleteEditor
// 		},
// 		{
// 			key: 'level_3',
// 			name: '小分類',
// 			editor: MyAutoCompleteEditor
// 		},
// 		{
// 			key: 'itemName',
// 			name: '名称',
// 			editor: MyAutoCompleteEditor
// 		},
// 		{
// 			key: 'unitPrice',
// 			name: '単価',
// 			editor: MyAutoCompleteEditor
// 		},
// 		{
// 			key: 'num',
// 			name: '個数',
// 			editable: true
// 		},
// 		{
// 			key: 'price',
// 			name: '価格',
// 			editable: false
// 		}
// 	];
// };

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

const handleCellSelected = (col: any) => {};
// const getRandomDate = (start: any, end: any) => {
//     return new Date(
//         start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     ).toLocaleDateString();
// };

const CreateFormDataGridComponent: React.SFC<ICreateFormDataGridComponentProps> = props => {
    if (props.rows !== undefined) {
        rows = props.rows;
    }
    if (props.autoCompleteOptions !== undefined) {
        autoCompleteOptions = props.autoCompleteOptions;
        // console.log(props.autoCompleteOptions);
    }
    return (
        <div>
            <ReactDataGrid
                enableCellSelect={true}
                columns={_columns}
                rowGetter={rowGetter}
                rowsCount={rows.length}
                minHeight={500}
                onGridRowsUpdated={handleGridRowsUpdated}
                onCellSelected={props.onSelectedCell}
                // tslint:disable-next-line:jsx-no-lambda
                toolbar={<Toolbar onAddRow={() => console.log('Add Row.')} enableFilter={true} />}
            />
            <br />
        </div>
    );
};

export default CreateFormDataGridComponent;
