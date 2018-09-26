//
// CreateFormDataGridComponent
//
'use strict';

import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';
import { FormDataRow, FormDataRowKeys } from '../states/CreateFormState';
import { DataDocKeys } from '../db';
const { AutoComplete: AutoCompleteEditor } = Editors;

// autoCompleteOptions
let autoCompleteOptions: any;
autoCompleteOptions = {};

const getOptions = (ddKey: string): { (): { id: number; title: string } } => {
    return () => {
        return autoCompleteOptions[ddKey];
    };
};

// MyAutoCompleteEditor
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
        // console.log('getValue() called!!');
        return this.autoComplete.getValue();
    }
    getInputNode() {
        // console.log('getInputNode() called!!!');
        return this.autoComplete.getInputNode();
    }
    hasResults() {
        // console.log('hasResults() called!!!');
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

// TODO: formatter
class NumberRightFormatter extends React.Component<any> {
    render() {
        const formattedValue: string = String(this.props.value).replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            '$1,'
        );
        return (
            <div title={this.props.value} className="text-right">
                {formattedValue}
            </div>
        );
    }
}
class CenterFormatter extends React.Component<any> {
    render() {
        return (
            <div title={this.props.value} className="text-center">
                {this.props.value}
            </div>
        );
    }
}

// TODO: row render
class MyRowRenderer extends React.Component<any> {
    constructor(props: any) {
        super(props);

        console.log('props=');
        console.log(props);
    }

    row: any;

    setScrollLeft = (scrollBy: any) => {
        // if you want freeze columns to work, you need to make sure you implement this as apass through
        this.row.setScrollLeft(scrollBy);
    };
    getRowStyle = () => {
        return {
            backgroundColor: this.getRowBackground()
        };
    };
    getRowBackground = () => {
        return this.props.idx % 2 ? 'green' : 'blue';
    };
    render() {
        if (this.props.row.checked) {
            // TODO: 実験用コード
            const { row, columns, ...other } = this.props;

            let l_column = {}; // 左端のカラムの情報
            let width = 0;
            for (let i = 0; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            l_column = Object.assign(
                l_column,
                columns[0],
                { width },
                { key: 'LabelTotalPrice' },
                { formatter: NumberRightFormatter }
            );

            let r_column = {}; // 右端のカラムの情報
            r_column = Object.assign(
                r_column,
                columns[columns.length - 1],
                { key: 'TotalPrice' },
                { formatter: NumberRightFormatter }
            );
            const _row = { LabelTotalPrice: '合計:', TotalPrice: 10000 };
            const _columns = [l_column, r_column];

            return (
                <div>
                    <ReactDataGrid.Row
                        ref={node => (this.row = node)}
                        columns={_columns}
                        row={_row}
                        {...other}
                    />
                </div>
            );
        }
        return (
            <div>
                <ReactDataGrid.Row ref={node => (this.row = node)} {...this.props} />
            </div>
        );
    }
}

// CreatFormDataGridComponent
export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    // colmuns?: {}[];
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
        // カラム定義
        const _columns = [
            {
                key: FormDataRowKeys.id,
                name: 'No.',
                width: 64,
                formatter: CenterFormatter
            },
            {
                key: FormDataRowKeys.level_1,
                name: '大分類',
                ddKey: DataDocKeys.level_1,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_1)} />
            },
            {
                key: FormDataRowKeys.level_2,
                name: '中分類',
                ddKey: DataDocKeys.level_2,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_2)} />
            },
            {
                key: FormDataRowKeys.level_3,
                name: '小分類',
                ddKey: DataDocKeys.level_3,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_3)} />
            },
            {
                key: FormDataRowKeys.itemName,
                name: '名称',
                ddKey: DataDocKeys.itemName,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.itemName)} />
            },
            {
                key: FormDataRowKeys.unitPrice,
                name: '単価',
                ddKey: DataDocKeys.unitPrice,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.unitPrice)} />,
                formatter: NumberRightFormatter
            },
            {
                key: FormDataRowKeys.num,
                name: '個数',
                editable: true,
                formatter: NumberRightFormatter
            },
            {
                key: FormDataRowKeys.price,
                name: '価格',
                editable: false,
                formatter: NumberRightFormatter
            }
        ];
        this.state = {
            columns: _columns
        };
        this.rowGetter.bind(this);
        this.rowCount.bind(this);
        this.handleCellSeceted.bind(this);
        // console.log('constructed.');
    }
    rowGetter = (i: number) => {
        return !this.props.rows
            ? []
            : i === this.props.rows.length
                ? { checked: true }
                : this.props.rows[i];
    };
    rowCount = () => {
        return !this.props.rows ? 0 : /*this.props.rows.length*/ this.props.rows.length + 1;
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
                        <Toolbar onAddRow={this.props.addRow} addRowButtonText="行追加" />
                    }
                    // jikken
                    rowRenderer={MyRowRenderer}
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
