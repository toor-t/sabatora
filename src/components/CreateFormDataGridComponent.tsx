/**
 * CreateFormDataGridComponent
 */
'use strict';

import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import {
    NormalDataRow,
    NormalDataRowKeys,
    TotalPriceRow,
    TotalPriceRowKeys,
    SubtotalPriceRow,
    SubtotalPriceRowKeys,
    FormDataRow
} from '../states/CreateFormState';
import { DataDocKeys } from '../db';
import AddCircle from '@material-ui/icons/AddCircle';
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import * as classNames from 'classnames';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
const { AutoComplete: AutoCompleteEditor } = Editors;
// TODO:実験
const {
    Menu: { ContextMenu, MenuItem, SubMenu }
} = require('react-data-grid-addons');

// autoCompleteOptions
let autoCompleteOptions: any;
autoCompleteOptions = {};

const getOptions = (ddKey: string): { (): { id: number; title: string } } => {
    return () => {
        return autoCompleteOptions[ddKey];
    };
};

// CustomAutoCompleteEditor
interface ICustomAutoComleteEditorStates {
    // TODO:
}
class CustomAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    any,
    ICustomAutoComleteEditorStates
> {
    constructor(props: any) {
        super(props);
        this.state = {
            // TODO:
        };
        this.getValue.bind(this);
        this.getInputNode.bind(this);
        this.hasResults.bind(this);
    }
    autoComplete: any;

    getValue() {
        return this.autoComplete.getValue();
    }
    getInputNode() {
        return this.autoComplete.getInputNode();
    }
    hasResults() {
        return this.autoComplete.hasResults();
    }
    render() {
        const { ref, options, getOptions, ...rest } = this.props;
        // 選択候補が多すぎる時は表示しない
        const _options =
            getOptions() === undefined
                ? undefined
                : getOptions().length < 100
                    ? getOptions()
                    : undefined;
        return (
            <AutoCompleteEditor
                ref={node => (this.autoComplete = node)}
                options={_options}
                {...rest}
            />
        );
    }
}

// TODO: Formatter
const NumberRightFormatter: React.SFC<any> = props => {
    if ((typeof props.value === 'number' && !isNaN(props.value)) || !isNaN(Number(props.value))) {
        const formattedValue: string = String(props.value).replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            '$1,'
        );
        return (
            <div title={formattedValue} className="text-right">
                {formattedValue}
            </div>
        );
    }
    return (
        <div title="Invalid Value" className="text-right" style={{ backgroundColor: 'orange' }}>
            {props.value}
        </div>
    );
};
const RightFormatter: React.SFC<any> = props => {
    return (
        <div title={props.value} className="text-right">
            {props.value}
        </div>
    );
};
const CenterFormatter: React.SFC<any> = props => {
    return (
        <div title={props.value} className="text-center">
            {props.value}
        </div>
    );
};
const BoldNumberRightFormatter: React.SFC<any> = props => {
    return (
        <strong>
            <NumberRightFormatter {...props} />
        </strong>
    );
};
const BoldRightFormatter: React.SFC<any> = props => {
    return (
        <strong>
            <RightFormatter {...props} />
        </strong>
    );
};

// TODO: Row render
interface ICustomRowRendererStates {
    grid: CreateFormDataGridComponent;
}
class CustomRowRenderer extends React.Component<any, ICustomRowRendererStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: this.props.grid
        };
    }

    row: any;

    shouldComponentUpdate(nextProps: any) {
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
        const { columns, ...other } = this.props;
        let _columns = columns;

        if (this.props.row[TotalPriceRowKeys.totalPrice] !== undefined) {
            // TODO: 合計表示
            const check_column = Object.assign(
                {},
                columns[0],
                { key: undefined },
                { formatter: undefined }
            );

            let l_column = {}; // 左端のカラムの情報
            let width = 0;
            for (let i = 1; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            l_column = Object.assign(
                l_column,
                columns[1],
                { width },
                { key: TotalPriceRowKeys.labelTotalPrice },
                { formatter: BoldRightFormatter }
            );
            const dummy_column = Object.assign(
                {},
                columns[1],
                { width },
                { key: undefined },
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
            _columns.push(check_column);
            for (let i = 1; i < columns.length - 2; i = i + 1) {
                _columns.push(Object.assign({}, dummy_column, { key: `dummy-${i}` }));
            }
            _columns.push(l_column);
            _columns.push(r_column);
            return (
                // <div>
                <ReactDataGrid.Row
                    ref={node => (this.row = node)}
                    forceUpdate={true}
                    columns={_columns}
                    {...other}
                />
                // </div>
            );
        }
        if (this.props.row[SubtotalPriceRowKeys.subtotalPrice] !== undefined) {
            // TODO: 小計表示
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
                { formatter: RightFormatter }
            );
            const dummy_column = Object.assign(
                {},
                columns[1],
                { width },
                { key: undefined },
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
                _columns.push(Object.assign({}, dummy_column, { key: `dummy-${i}` }));
            }
            _columns.push(l_column);
            _columns.push(r_column);
            return (
                // <div>
                <ReactDataGrid.Row
                    ref={node => (this.row = node)}
                    forceUpdate={true}
                    columns={_columns}
                    {...other}
                />
                // </div>
            );
        }
        // 通常行
        return (
            // <div>
            <ReactDataGrid.Row ref={node => (this.row = node)} columns={_columns} {...other} />
            // </div>
        );
    }
}

// CreatFormDataGridComponent
const ROW_HEIGHT = 35;
const HEADER_ROW_HEIGHT = 40;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 440,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            overflow: 'visible'
            // padding: theme.spacing.unit * 3,
        }
    });

export interface ICreateFormDataGridComponentStateProps {
    // TODO:
    rows: {}[];
    autoCompleteOptions: {};
}
export interface ICreateFormDataGridComponentDispatchProps {
    // TODO:
    onGridRowUpdate: (e: ReactDataGrid.GridRowsUpdatedEvent) => void;
    onSelectedCell: (col: { rowIdx: number; idx: number }) => void;
    updateAutoCompleteOptions: (col: { rowData: NormalDataRow; columnDDKey: string }) => void;
    addRow: () => void;
    deleteRows: () => void;
    selectRows: (rows: { rowIdx: number; row: FormDataRow }[]) => void;
    deselectRows: (rows: { rowIdx: number; row: FormDataRow }[]) => void;
    addSubtotalRow: () => void;
}
interface ICreateFormDataGridComponentStates {
    columns: any[];
}
class CreateFormDataGridComponent extends React.Component<
    ICreateFormDataGridComponentStateProps &
        ICreateFormDataGridComponentDispatchProps &
        WithStyles<typeof styles>,
    ICreateFormDataGridComponentStates
> {
    constructor(
        props: ICreateFormDataGridComponentStateProps &
            ICreateFormDataGridComponentDispatchProps &
            WithStyles<typeof styles>
    ) {
        super(props);
        // カラム定義
        const columns: (ReactDataGrid.Column<NormalDataRow> & { ddKey?: string })[] = [
            {
                key: NormalDataRowKeys.id,
                name: 'No.',
                width: 48,
                formatter: CenterFormatter
            },
            {
                key: NormalDataRowKeys.level_1,
                name: '大分類',
                ddKey: DataDocKeys.level_1,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_1)} />,
                resizable: true
            },
            {
                key: NormalDataRowKeys.level_2,
                name: '中分類',
                ddKey: DataDocKeys.level_2,
                resizable: true,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_2)} />
            },
            {
                key: NormalDataRowKeys.level_3,
                name: '小分類',
                resizable: true,
                ddKey: DataDocKeys.level_3,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_3)} />
            },
            {
                key: NormalDataRowKeys.itemName,
                name: '名称',
                resizable: true,
                ddKey: DataDocKeys.itemName,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.itemName)} />
            },
            {
                key: NormalDataRowKeys.unitPrice,
                name: '単価',
                resizable: true,
                ddKey: DataDocKeys.unitPrice,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.unitPrice)} />,
                formatter: NumberRightFormatter
            },
            {
                key: NormalDataRowKeys.num,
                name: '個数',
                editable: true,
                resizable: true,
                formatter: NumberRightFormatter
            },
            {
                key: NormalDataRowKeys.price,
                name: '価格',
                editable: false,
                resizable: true,
                formatter: NumberRightFormatter
            }
        ];
        this.state = {
            columns
        };
        this.rowGetter.bind(this);
        this.rowCount.bind(this);
        this.handleCellSeceted.bind(this);
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
            (this.props.rows[col.rowIdx] as NormalDataRow)[NormalDataRowKeys.price] !== undefined
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
                        rowData: this.props.rows[col.rowIdx] as NormalDataRow,
                        columnDDKey:
                            this.state.columns[col.idx - 1 /* チェックボックスの分引く */].ddKey !==
                            undefined
                                ? this.state.columns[col.idx - 1 /* チェックボックスの分引く */]
                                      .ddKey
                                : ''
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
    // TODO: 実験中
    deleteRow = (e: any, { rowIdx }: { rowIdx: number; idx: number }) => {
        this.props.rows.splice(rowIdx, 1);
        // this.setState({ rows: this.state.rows });
    };

    insertRowAbove = (e: any, { rowIdx }: { rowIdx: number; idx: number }) => {
        this.insertRow(rowIdx);
    };

    insertRowBelow = (e: any, { rowIdx }: { rowIdx: number; idx: number }) => {
        this.insertRow(rowIdx + 1);
    };

    insertRow = (rowIdx: number) => {
        // const newRow = {
        // 	id: 0,
        // 	title: 'New at ' + (rowIdx + 1),
        // 	count: 0
        // };
        // let rows = [...this.state.rows];
        // rows.splice(rowIdx, 0, newRow);
        // this.setState({ rows });
    };

    render() {
        // TODO:
        if (this.props.autoCompleteOptions !== undefined) {
            autoCompleteOptions = this.props.autoCompleteOptions;
        }
        return (
            <div id="CreateFormDataGrid" /*className={this.props.classes.content}*/>
                <ReactDataGrid
                    ref={(node: ReactDataGrid<{}> | null) => {
                        this.grid = node;
                    }}
                    contextMenu={
                        <MyContextMenu
                            id="customizedContextMenu"
                            onRowDelete={this.deleteRow}
                            onRowInsertAbove={this.insertRowAbove}
                            onRowInsertBelow={this.insertRowBelow}
                        />
                    }
                    enableCellSelect={true}
                    cellNavigationMode="changeRow"
                    rowSelection={{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            isSelectedKey: NormalDataRowKeys.selected
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
                    rowRenderer={CustomRowRenderer}
                />
                <br />
            </div>
        );
    }
}

// TODO: 実験
interface IMyContextMenuSteteProps {
    rowIdx?: number;
    idx?: number;
    id: string;
}
interface IMyContextMenuDispatchProps {
    onRowDelete: (e: any, data: any) => void;
    onRowInsertAbove: (e: any, data: any) => void;
    onRowInsertBelow: (e: any, data: any) => void;
}
class MyContextMenu extends React.Component<
    IMyContextMenuSteteProps & IMyContextMenuDispatchProps
> {
    onRowDelete = (e: any, data: any) => {
        if (typeof this.props.onRowDelete === 'function') {
            this.props.onRowDelete(e, data);
        }
    };

    onRowInsertAbove = (e: any, data: any) => {
        if (typeof this.props.onRowInsertAbove === 'function') {
            this.props.onRowInsertAbove(e, data);
        }
    };

    onRowInsertBelow = (e: any, data: any) => {
        if (typeof this.props.onRowInsertBelow === 'function') {
            this.props.onRowInsertBelow(e, data);
        }
    };

    render() {
        const { idx, id, rowIdx } = this.props;

        return (
            <ContextMenu id={id}>
                <MenuItem data={{ rowIdx, idx }} onClick={this.onRowDelete}>
                    行削除
                </MenuItem>
                <SubMenu title="行挿入">
                    <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertAbove}>
                        上
                    </MenuItem>
                    <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertBelow}>
                        下
                    </MenuItem>
                </SubMenu>
            </ContextMenu>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CreateFormDataGridComponent);
