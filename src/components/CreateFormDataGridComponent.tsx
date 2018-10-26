/**
 * CreateFormDataGridComponent
 */
'use strict';

import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
const { AutoComplete: AutoCompleteEditor, SimpleTextEditor } = Editors;
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
import { Str, BtnLabel } from '../strings';

// autoCompleteOptions
let autoCompleteOptions: any;
autoCompleteOptions = {};

const getOptions = (ddKey: string): { (): { id: number; title: string }[] } => {
    return () => {
        return autoCompleteOptions[ddKey];
    };
};

// CustomAutoCompleteEditor
interface ICustomAutoCompleteEditorProps {
    // TODO:
    getOptions: () => { id: number; title: string };
}
interface ICustomAutoCompleteEditorStates {}
class CustomAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    ICustomAutoCompleteEditorProps & any,
    ICustomAutoCompleteEditorStates
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
        // TODO: 実験
        // return this.autoComplete.getValue();
        const valueObj: {} = this.autoComplete.getValue();
        // console.log(valueObj);
        const key = Object.keys(valueObj)[0];
        // console.log(key);
        const value = Object.values(valueObj)[0];
        // console.log(value)
        const _options: { id: number; title: string }[] = this.props.getOptions();
        if (_options) {
            // console.log(_options);
            let found: boolean = false;
            _options.map((option, index, array) => {
                if (option.title === value) {
                    found = true;
                }
            });
            if (!found) return { [key]: '' };
        }
        return valueObj;
    }
    getInputNode() {
        return this.autoComplete.getInputNode();
    }
    hasResults() {
        return this.autoComplete.hasResults();
    }
    render() {
        const { ref, options, getOptions, ...rest } = this.props;
        // console.log(rest);
        // 選択候補が多すぎる時は表示しない
        const _options =
            getOptions() === undefined
                ? undefined
                : getOptions().length === 0
                    ? undefined
                    : getOptions().length < 100
                        ? getOptions()
                        : undefined;
        return _options !== undefined ? (
            <AutoCompleteEditor
                ref={node => (this.autoComplete = node)}
                options={_options}
                {...rest}
            />
        ) : (
            <SimpleTextEditor ref={node => (this.autoComplete = node)} {...rest} />
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

            let width = 0;
            for (let i = 1; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            // 左端のカラムの情報
            const l_column = Object.assign(
                {},
                columns[1],
                { name: 'LabelTotalPrice' },
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
            // 右端のカラムの情報
            const r_column = Object.assign(
                {},
                columns[columns.length - 1],
                { name: 'TotalPrice' },
                { key: TotalPriceRowKeys.totalPrice },
                { formatter: BoldNumberRightFormatter }
            );
            _columns = [];
            _columns.push(check_column);
            for (let i = 2; i < columns.length - 1; i = i + 1) {
                _columns.push(
                    Object.assign({}, dummy_column, { key: `dummy-${i}`, name: `dummy-${i}` })
                );
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

            let width = 0;
            for (let i = 1; i < columns.length - 1; i = i + 1) {
                width += columns[i].width;
            }
            // 左端のカラムの情報
            const l_column = Object.assign(
                {},
                columns[1],
                { name: 'LabelSubtotalPrice' },
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
            // 右端のカラムの情報
            const r_column = Object.assign(
                {},
                columns[columns.length - 1],
                { name: 'SubtotalPrice' },
                { key: SubtotalPriceRowKeys.subtotalPrice },
                { formatter: NumberRightFormatter }
            );
            _columns = [];
            _columns.push(check_column);
            for (let i = 1; i < columns.length - 2; i = i + 1) {
                _columns.push(
                    Object.assign({}, dummy_column, { key: `dummy-${i}`, name: `dummy-${i}` })
                );
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
const HEADER_ROW_HEIGHT = 35;

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
    rows: {}[];
    autoCompleteOptions: {};
    // TODO:
    selectedRowsCount: number;
    firstSelectedRowIdx: number;
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
                name: Str.No,
                width: 48,
                formatter: CenterFormatter
            },
            {
                key: NormalDataRowKeys.level_1,
                name: Str.Level_1,
                ddKey: DataDocKeys.level_1,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_1)} />,
                resizable: true
            },
            {
                key: NormalDataRowKeys.level_2,
                name: Str.Level_2,
                ddKey: DataDocKeys.level_2,
                resizable: true,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_2)} />
            },
            {
                key: NormalDataRowKeys.level_3,
                name: Str.Level_3,
                resizable: true,
                ddKey: DataDocKeys.level_3,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_3)} />
            },
            {
                key: NormalDataRowKeys.itemName,
                name: Str.ItemName,
                resizable: true,
                ddKey: DataDocKeys.itemName,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.itemName)} />
            },
            {
                key: NormalDataRowKeys.unitPrice,
                name: Str.UnitPrice,
                resizable: true,
                ddKey: DataDocKeys.unitPrice,
                editor: <CustomAutoCompleteEditor getOptions={getOptions(DataDocKeys.unitPrice)} />,
                formatter: NumberRightFormatter
            },
            {
                key: NormalDataRowKeys.num,
                name: Str.Num,
                editable: true,
                resizable: true,
                formatter: NumberRightFormatter
            },
            {
                key: NormalDataRowKeys.price,
                name: Str.Price,
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
        this.props.onSelectedCell(col);
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
                this.props.updateAutoCompleteOptions({
                    rowData: this.props.rows[col.rowIdx] as NormalDataRow,
                    columnDDKey:
                        this.state.columns[col.idx - 1 /* チェックボックスの分引く */].ddKey !==
                        undefined
                            ? this.state.columns[col.idx - 1 /* チェックボックスの分引く */].ddKey
                            : ''
                });
            }
        }
    };
    onRowsSelected = (rows: any) => {
        this.props.selectRows(rows);
    };
    onRowsDeselected = (rows: any) => {
        this.props.deselectRows(rows);
    };
    handleAddRowBtn = (e: any) => {
        this.props.addRow();
    };
    handleDeleteBtn = (e: any) => {
        this.props.deleteRows();
    };
    handleAddSubtotalBtn = (e: any) => {
        this.props.addSubtotalRow();
    };

    // TODO: 実験
    handleOnCheckCellIsEditable = (param: any) => {
        if (
            param.row[TotalPriceRowKeys.labelTotalPrice] ||
            param.row[SubtotalPriceRowKeys.labelSubtotalPrice]
        ) {
            // 合計行、小計行では編集禁止
            // console.log('not editable');
            return false;
        }
        // console.log('editable');
        return true;
    };

    render() {
        // TODO:
        if (this.props.autoCompleteOptions !== undefined) {
            autoCompleteOptions = this.props.autoCompleteOptions;
        }
        // TODO: 標準のtypesファイルに onCheckCellIsEditable の定義が無いための苦肉の策。
        const MyReactDataGrid = ReactDataGrid as any;

        return (
            <div
                id="CreateFormDataGrid"
                /*className={this.props.classes.content}*/
                style={{ fontSize: '0.8125rem' }}
            >
                <MyReactDataGrid /* TODO: 標準のtypesファイルに onCheckCellIsEditable の定義が無いための苦肉の策。 */
                    ref={(node: ReactDataGrid<{}> | null) => {
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
                        ROW_HEIGHT * (this.rowCount() + 6) /* 下部余白6行分 */ -
                        1
                    }
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    onCellSelected={this.handleCellSeceted}
                    toolbar={
                        <Toolbar>
                            <button type="button" className="btn" onClick={this.handleAddRowBtn}>
                                <AddCircle />
                                {this.props.selectedRowsCount === 1
                                    ? BtnLabel.InsertRow
                                    : BtnLabel.AddRow}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={this.handleAddSubtotalBtn}
                            >
                                <AddBox />
                                {this.props.selectedRowsCount === 1
                                    ? BtnLabel.InsertSubtotalRow
                                    : BtnLabel.AddSubtotalRow}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={this.handleDeleteBtn}
                                disabled={this.props.selectedRowsCount === 0 ? true : false}
                            >
                                <RemoveCircle />
                                {BtnLabel.DeleteRows}
                            </button>
                        </Toolbar>
                    }
                    rowRenderer={CustomRowRenderer}
                    // TODO: 実験
                    onCheckCellIsEditable={this.handleOnCheckCellIsEditable}
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CreateFormDataGridComponent);
