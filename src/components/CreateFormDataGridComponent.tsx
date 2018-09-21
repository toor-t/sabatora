'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
autoCompleteOptions = [];

const getOptions = (): { id: number; title: string }[] => {
    return autoCompleteOptions;
};
// for (let i = 0; i < 100; i = i + 1) {
// 	autoCompleteOptions.push({ id: i, title: `${i}` });
// }

// interface IMyAutoComleteEditorStates {
// 	autoCompleteOptions: { id: number; title: string }[];
// }

// class MyAutoCompleteEditor extends React.Component<EditorsBasePros,IMyAutoComleteEditorStates> {
// 	constructor(props: any) {
// 		super(props);
// 		this.state = {
// 			autoCompleteOptions,
// 		}
// 	};
// 	render() {
// 		return (
// 			<AutoCompleteEditor
// 				// tslint:disable-next-line:jsx-no-lambda
// 				onFocus={() => this.setState({ autoCompleteOptions })}
// 				options={(this.state as IMyAutoComleteEditorStates).autoCompleteOptions}
// 				{...this.props}
// 			/>
// 		);
// 	}
// }

const MyAutoCompleteEditor = <AutoCompleteEditor options={getOptions()} />;

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
}

// tslint:disable-next-line:prefer-const
let _columns = [
    {
        key: 'id',
        name: 'No.',
        width: 80
    },
    {
        key: 'level_1',
        name: '大分類',
        editor: MyAutoCompleteEditor
    },
    {
        key: 'level_2',
        name: '中分類',
        editor: MyAutoCompleteEditor
    },
    {
        key: 'level_3',
        name: '小分類',
        editor: MyAutoCompleteEditor
    },
    {
        key: 'itemName',
        name: '名称',
        editor: MyAutoCompleteEditor
    },
    {
        key: 'unitPrice',
        name: '単価',
        editor: MyAutoCompleteEditor
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
            />
            <br />
        </div>
    );
};

export default CreateFormDataGridComponent;
