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
import Delete from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { withStyles } from '@material-ui/core/styles';
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
class BoldNumberRightFormatter extends React.Component<any> {
    render() {
        return (
            <strong>
                <NumberRightFormatter {...this.props} />
            </strong>
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
                { formatter: BoldNumberRightFormatter }
            );
            const dummy_column = Object.assign(
                {},
                columns[0],
                { width },
                { key: '' },
                { formatter: undefined },
                { hidden: true }
            );
            let r_column = {}; // 右端のカラムの情報
            r_column = Object.assign(
                r_column,
                columns[columns.length - 1],
                { key: TotalPriceRowKeys.totalPrice },
                { formatter: BoldNumberRightFormatter }
            );
            _columns = [];
            for (let i = 0; i < columns.length - 2; i = i + 1) {
                _columns.push(dummy_column);
            }
            _columns.push(l_column);
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
        if (this.props.row[SubtotalPriceRowKeys.subtotalPrice] !== undefined) {
            // 小計表示
            // TODO:
            // TODO: 実験用コード
            const check_column = columns[0]; // チェックボックスカラム

            let l_column = {}; // 左端のカラムの情報
            let width = 0;
            for (let i = 1; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            l_column = Object.assign(
                l_column,
                columns[1],
                { width },
                { key: SubtotalPriceRowKeys.labelSubtotalPrice },
                { formatter: NumberRightFormatter }
            );
            const dummy_column = Object.assign(
                {},
                columns[1],
                { width },
                { key: '' },
                { formatter: undefined },
                { hidden: true }
            );
            let r_column = {}; // 右端のカラムの情報
            r_column = Object.assign(
                r_column,
                columns[columns.length - 1],
                { key: SubtotalPriceRowKeys.subtotalPrice },
                { formatter: NumberRightFormatter }
            );
            _columns = [];
            _columns.push(check_column);
            for (let i = 1; i < columns.length - 2; i = i + 1) {
                _columns.push(dummy_column);
            }
            _columns.push(l_column);
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

export interface ICreateFormDataGridComponentStateProps {
    // TODO:
    rows: {}[];
    // colmuns: {}[];
    autoCompleteOptions: {};
    // TODO:
    totalPrice: number;
}
export interface ICreateFormDataGridComponentDispatchProps {
    // TODO:
    onGridRowUpdate: (e: any) => void;
    onSelectedCell: (col: { rowIdx: number; idx: number }) => void;
    updateAutoCompleteOptions: (col: { rowData: FormDataRow; idx: number }) => void;
    addRow: () => void;
    deleteRows: () => void;
    selectRows: (rows: { rowIdx: number; row: FormData }[]) => void;
    deselectRows: (rows: { rowIdx: number; row: FormData }[]) => void;
    addSubtotalRow: () => void;
}
interface ICreateFormDataGridComponentStates {
    columns: any[];
    // TODO:
    totalPrice: number | undefined;
}
class CreateFormDataGridComponent extends React.Component<
    ICreateFormDataGridComponentStateProps & ICreateFormDataGridComponentDispatchProps,
    ICreateFormDataGridComponentStates
> {
    constructor(
        props: ICreateFormDataGridComponentStateProps & ICreateFormDataGridComponentDispatchProps
    ) {
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
            if (
                col.idx > 1 &&
                this.state.columns[col.idx /* 行選択チェックボックス分 */ - 1]['ddKey'] !==
                    undefined
            ) {
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
    onRowsSelected = (rows: any) => {
        // TODO:
        if (this.props.selectRows) {
            this.props.selectRows(rows);
        }
    };
    onRowsDeselected = (rows: any) => {
        // TODO:
        if (this.props.deselectRows) {
            this.props.deselectRows(rows);
        }
    };
    handleAddRowBtn = (e: any) => {
        if (this.props.addRow) {
            this.props.addRow();
        }
    };
    handleDeleteBtn = (e: any) => {
        if (this.props.deleteRows) {
            this.props.deleteRows();
        }
    };
    handleAddSubtotalBtn = (e: any) => {
        if (this.props.addSubtotalRow) {
            this.props.addSubtotalRow();
        }
    };
    // TODO:
    getTotalPrice = () => {
        return this.state.totalPrice ? this.state.totalPrice : 0;
    };
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
                    cellNavigationMode="changeRow"
                    rowSelection={{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            isSelectedKey: FormDataRowKeys.checked
                        }
                    }}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    rowHeight={ROW_HEIGHT}
                    headerRowHeight={HEADER_ROW_HEIGHT}
                    minHeight={
                        HEADER_ROW_HEIGHT +
                        ROW_HEIGHT *
                            ((this.rowCount() < 20 ? 20 : this.rowCount()) +
                                2) /* 下部余白２行分 */ -
                        1
                    }
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    onCellSelected={this.handleCellSeceted}
                    toolbar={
                        <Toolbar>
                            <button type="button" className="btn" onClick={this.handleAddRowBtn}>
                                <AddCircle />
                                {'行追加'}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={this.handleAddSubtotalBtn}
                            >
                                <AddBox />
                                {'小計行追加'}
                            </button>
                            <button type="button" className="btn" onClick={this.handleDeleteBtn}>
                                <RemoveCircle />
                                {'行削除'}
                            </button>
                        </Toolbar>
                    }
                    rowRenderer={MyRowRenderer}
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
