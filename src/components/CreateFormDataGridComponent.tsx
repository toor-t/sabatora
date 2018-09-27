//
// CreateFormDataGridComponent
//
'use strict';

import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import {
    FormDataRow,
    FormDataRowKeys,
    TotalPriceRow,
    TotalPriceRowKeys,
    SubtotalPriceRow,
    SubtotalPriceRowKeys
} from '../states/CreateFormState';
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
        // console.log(`NumberRightFormatter=${String(this.props.value)}`);
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
interface IMyRowRendererStates {
    grid: CreateFormDataGridComponent;
}
class MyRowRenderer extends React.Component<any, IMyRowRendererStates> {
    constructor(props: any) {
        super(props);

        // console.log('props=');
        // console.log(props);
        this.state = {
            grid: this.props.grid
        };
    }

    row: any;

    shouldComponentUpdate(nextProps: any) {
        // console.log(`shouldComponentUpdate(${nextProps})`)
        return this.row.shouldComponentUpdate(nextProps);
    }
    forceUpdate() {
        // console.log('forceUpdate()');
    }
    setScrollLeft = (scrollBy: any) => {
        // if you want freeze columns to work, you need to make sure you implement this as apass through
        if (this.row.setScrollLeft) {
            this.row.setScrollLeft(scrollBy);
        }
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
        // console.log('MyRowRenderer.render()=');
        // console.log(this.props);

        const { columns, ...other } = this.props;
        let _columns = columns;

        if (this.props.row[TotalPriceRowKeys.totalPrice] !== undefined) {
            // 合計表示
            // console.log('Rneder TotalPrice=');
            // console.log(this.props.row.totalPrice);
            // TODO: 実験用コード

            let l_column = {}; // 左端のカラムの情報
            let width = 0;
            for (let i = 0; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            l_column = Object.assign(
                l_column,
                columns[0],
                { width },
                { key: TotalPriceRowKeys.labelTotalPrice },
                { formatter: NumberRightFormatter }
            );

            let r_column = {}; // 右端のカラムの情報
            r_column = Object.assign(
                r_column,
                columns[columns.length - 1],
                { key: TotalPriceRowKeys.totalPrice },
                { formatter: NumberRightFormatter }
            );
            _columns = [];
            for (let i = 0; i < columns.length - 1; i = i + 1) {
                _columns.push(l_column);
            }
            _columns.push(r_column);
            return (
                <div>
                    <ReactDataGrid.Row
                        ref={node => (this.row = node)}
                        forceUpdate={true}
                        columns={_columns}
                        {...other}
                    />
                </div>
            );
        }
        if (this.props.row[SubtotalPriceRowKeys.subtotalPrice]) {
            // 小計表示
            // TODO:
            // TODO: 実験用コード

            let l_column = {}; // 左端のカラムの情報
            let width = 0;
            for (let i = 0; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            l_column = Object.assign(
                l_column,
                columns[0],
                { width },
                { key: SubtotalPriceRowKeys.labelSubtotalPrice },
                { formatter: NumberRightFormatter }
            );

            let r_column = {}; // 右端のカラムの情報
            r_column = Object.assign(
                r_column,
                columns[columns.length - 1],
                { key: SubtotalPriceRowKeys.subtotalPrice },
                { formatter: NumberRightFormatter }
            );
            _columns = [l_column, r_column];
            return (
                <div>
                    <ReactDataGrid.Row
                        ref={node => (this.row = node)}
                        forceUpdate={true}
                        columns={_columns}
                        {...other}
                    />
                </div>
            );
        }
        //
        return (
            <div>
                <ReactDataGrid.Row ref={node => (this.row = node)} columns={_columns} {...other} />
            </div>
        );
    }
}

// CreatFormDataGridComponent
const ROW_HEIGHT = 35;
const HEADER_ROW_HEIGHT = 40;
export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    // colmuns?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: {};
    updateAutoCompleteOptions?: (col: { rowData: FormDataRow; idx: number }) => void;
    addRow?: () => void;
    // TODO:
    totalPrice?: number;
}
interface ICreateFormDataGridComponentStates {
    columns: any[];
    // TODO:
    totalPrice: number | undefined;
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
            columns: _columns,
            totalPrice: props.totalPrice
        };
        this.rowGetter.bind(this);
        this.rowCount.bind(this);
        this.handleCellSeceted.bind(this);
        this.getTotalPrice.bind(this);
        // console.log('constructed.');
    }
    // ReactDataGridへの参照
    grid: any = {};

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
        // TODO: updateAutoCompleteOptions
        if (
            this.props.rows &&
            (this.props.rows[col.rowIdx] as FormDataRow)[FormDataRowKeys.price] !== undefined
        ) {
            // 通常行のみ。合計行等では更新しない
            if (this.state.columns[col.idx]['ddKey'] !== undefined) {
                // DBに対応するデータがあるカラムのみ。
                if (this.props.updateAutoCompleteOptions) {
                    this.props.updateAutoCompleteOptions({
                        rowData: this.props.rows[col.rowIdx] as FormDataRow,
                        idx: col.idx
                    });
                }
            }
        }
    };
    // TODO:
    getTotalPrice = () => {
        return this.state.totalPrice ? this.state.totalPrice : 0;
    };
    // componentDidUpdate = () => {
    // 	console.log(`this.grid=`);
    // 	console.log(this.grid);
    // 	(this.grid as ReactDataGrid<any>).forceUpdate();
    // }
    render() {
        // TODO:
        if (this.props.autoCompleteOptions !== undefined) {
            autoCompleteOptions = this.props.autoCompleteOptions;
        }
        return (
            <div>
                <ReactDataGrid
                    ref={node => {
                        this.grid = node;
                    }}
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    rowHeight={ROW_HEIGHT}
                    headerRowHeight={HEADER_ROW_HEIGHT}
                    minHeight={
                        HEADER_ROW_HEIGHT +
                        ROW_HEIGHT * (this.rowCount() < 20 ? 20 : this.rowCount()) -
                        1
                    }
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    onCellSelected={this.handleCellSeceted}
                    toolbar={
                        // tslint:disable-next-line:jsx-no-lambda
                        <Toolbar onAddRow={this.props.addRow} addRowButtonText="行追加" />
                    }
                    rowRenderer={MyRowRenderer}
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
