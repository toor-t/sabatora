'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';
import { FormDataRow } from '../states/CreateFormState';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
autoCompleteOptions = [/*TEST DATA*/ { id: 0, title: 'hehehe' }];

// TODO:
const getAutoCompleteOptions = (): { id: number; title: string }[] => {
    return autoCompleteOptions;
};

interface IMyAutoComleteEditorStates {
    // TODO:
}

class MyAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    any,
    IMyAutoComleteEditorStates
> {
    constructor(props: any) {
        super(props);
        this.state = {
            // TODO:
        };
        this.getValue.bind(this);
        this.getInputNode.bind(this);
        this.hasResults.bind(this);
        // console.log('constructor called.');
    }
    autoComplete: any;

    getValue() {
        console.log('getValue() called!!');
        return this.autoComplete.getValue();
    }
    getInputNode() {
        console.log('getInputNode() called!!!');
        return this.autoComplete.getInputNode();
    }
    hasResults() {
        console.log('hasResults() called!!!');
        return this.autoComplete.hasResults();
    }
    render() {
        const { ref, options, getOptions, ...rest } = this.props;
        // console.log(`render called.`);
        // console.log(this.props);
        return (
            <AutoCompleteEditor
                ref={node => (this.autoComplete = node)}
                options={getOptions()}
                {...rest}
            />
        );
    }
}

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
    updateAutoCompleteOptions?: (col: { rowData: FormDataRow; idx: number }) => void;
    addRow?: () => void;
}

interface ICreateFormDataGridComponentStates {
    columns: any[];
}

class CreateFormDataGridComponent extends React.Component<
    ICreateFormDataGridComponentProps,
    ICreateFormDataGridComponentStates
> {
    constructor(props: ICreateFormDataGridComponentProps) {
        super(props);
        const _columns = [
            {
                key: 'id',
                name: 'No.',
                width: 64
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

        this.state = {
            columns: _columns
        };

        this.rowGetter.bind(this);
        this.rowCount.bind(this);

        console.log('constructed.');
    }
    rowGetter = (i: number) => {
        return !this.props.rows ? [] : this.props.rows[i];
    };
    rowCount = () => {
        return !this.props.rows ? 0 : this.props.rows.length;
    };
    handleCellSeceted = (col: { rowIdx: number; idx: number }) => {
        // TODO:
        if (this.props.onSelectedCell) {
            this.props.onSelectedCell(col);
        }
        if (this.props.updateAutoCompleteOptions && this.props.rows) {
            this.props.updateAutoCompleteOptions({
                rowData: this.props.rows[col.rowIdx] as FormDataRow,
                idx: col.idx
            });
        }
    };
    render() {
        // TODO:
        if (this.props.autoCompleteOptions !== undefined) {
            autoCompleteOptions = this.props.autoCompleteOptions;
        }

        return (
            <div>
                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    minHeight={500}
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    onCellSelected={this.handleCellSeceted}
                    toolbar={
                        // tslint:disable-next-line:jsx-no-lambda
                        <Toolbar onAddRow={this.props.addRow} enableFilter={true} />
                    }
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
