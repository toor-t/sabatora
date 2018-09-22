'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
autoCompleteOptions = [];

// TODO:
const getAutoCompleteOptions = (): { id: number; title: string }[] => {
    return autoCompleteOptions;
};

interface IMyAutoComleteEditorStates {
    options: { id: number; title: string }[];
    getOptions: () => { id: number; title: string }[];
}

class MyAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    any,
    IMyAutoComleteEditorStates
> {
    constructor(props: any) {
        super(props);
        const { getOptions } = this.props;
        this.state = {
            getOptions,
            options: getOptions()
        };
        console.log('constructor called.');
    }
    render() {
        const { options, getOptions, ...rest } = this.props;
        return <AutoCompleteEditor options={this.state.options} {...rest} />;
    }
}

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
}

const columns = [
    {
        key: 'id',
        name: 'No.',
        width: 80
    },
    {
        key: 'level_1',
        name: '大分類',
        editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
    },
    {
        key: 'level_2',
        name: '中分類',
        editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
    },
    {
        key: 'level_3',
        name: '小分類',
        editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
    },
    {
        key: 'itemName',
        name: '名称',
        editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
    },
    {
        key: 'unitPrice',
        name: '単価',
        editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
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
                columns={columns}
                rowGetter={rowGetter}
                rowsCount={rows.length}
                minHeight={500}
                onGridRowsUpdated={props.onGridRowUpdate}
                onCellSelected={props.onSelectedCell}
                // tslint:disable-next-line:jsx-no-lambda
                toolbar={<Toolbar onAddRow={() => console.log('Add Row.')} enableFilter={true} />}
            />
            <br />
        </div>
    );
};

export default CreateFormDataGridComponent;
