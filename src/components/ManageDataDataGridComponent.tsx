/**
 * ManageDataDataGridComponent
 */

import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors, Menu, Data } from 'react-data-grid-addons';
import { DataDocKeys, DataDoc } from '../db';
import AddCircle from '@material-ui/icons/AddCircle';
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import * as classNames from 'classnames';
import { Paper, MenuList, MenuItem } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DBDataRowKeys, DBDataRow } from '../states/ManageDataState';
import { Str, BtnLabel } from '../strings';
// tslint:disable-next-line:import-name
import EventListener from 'react-event-listener';

/**
 * Formatter
 */

/**
 * FormatterProps
 */
type FormatterProps = {
    value: any;
};
const NumberRightFormatter: React.SFC<FormatterProps> = props => {
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
const RightFormatter: React.SFC<FormatterProps> = props => {
    return (
        <div title={props.value} className="text-right">
            {props.value}
        </div>
    );
};
const CenterFormatter: React.SFC<FormatterProps> = props => {
    return (
        <div title={props.value} className="text-center">
            {props.value}
        </div>
    );
};
const BoldNumberRightFormatter: React.SFC<FormatterProps> = props => {
    return (
        <strong>
            <NumberRightFormatter {...props} />
        </strong>
    );
};
const BoldRightFormatter: React.SFC<FormatterProps> = props => {
    return (
        <strong>
            <RightFormatter {...props} />
        </strong>
    );
};

// ManageDataDataGridComponent
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

/**
 * ManageDataDataGridComponentStateProps
 */
export type ManageDataDataGridComponentStateProps = {
    rows: DBDataRow[] | null;
    selectedRowsCount: number;
};
/**
 * ManageDataDataGridComponentDispatchProps
 */
export type ManageDataDataGridComponentDispatchProps = {
    queryDb: () => void;
    // TODO:
    onGridRowUpdate: (e: ReactDataGrid.GridRowsUpdatedEvent) => void;
    // onSelectedCell: (col: { rowIdx: number; idx: number }) => void;
    addRow: () => void;
    deleteRows: () => void;
    selectRows: (rows: { rowIdx: number; row: DBDataRow }[]) => void;
    deselectRows: (rows: { rowIdx: number; row: DBDataRow }[]) => void;
};
/**
 * ManageDataDataGridComponentStates
 */
type ManageDataDataGridComponentStates = {
    columns: (ReactDataGrid.Column<DBDataRow> & { ddKey?: string })[];
    width: number;
    height: number;
};
/**
 * ManageDataDataGridComponent
 */
class ManageDataDataGridComponent extends React.Component<
    ManageDataDataGridComponentStateProps &
        ManageDataDataGridComponentDispatchProps &
        WithStyles<typeof styles>,
    ManageDataDataGridComponentStates
> {
    constructor(
        props: ManageDataDataGridComponentStateProps &
            ManageDataDataGridComponentDispatchProps &
            WithStyles<typeof styles>
    ) {
        super(props);
        // カラム定義
        const columns: (ReactDataGrid.Column<DBDataRow> & { ddKey?: string })[] = [
            /**
             * level
             */
            // level 1
            {
                key: DBDataRowKeys.level_1,
                name: Str.Level_1,
                ddKey: DataDocKeys.level_1,
                resizable: true,
                editable: true
            },
            // level 2
            {
                key: DBDataRowKeys.level_2,
                name: Str.Level_2,
                ddKey: DataDocKeys.level_2,
                resizable: true,
                editable: true
            },
            // level 3
            {
                key: DBDataRowKeys.level_3,
                name: Str.Level_3,
                ddKey: DataDocKeys.level_3,
                resizable: true,
                editable: true
            },
            /**
             * itemName
             */
            {
                key: DBDataRowKeys.itemName,
                name: Str.ItemName,
                ddKey: DataDocKeys.itemName,
                resizable: true,
                editable: true
            },
            /**
             * unitPrice
             */
            // unitPrice 1
            {
                key: DBDataRowKeys.unitPrice_1,
                name: `${Str.UnitPrice} 1`,
                ddKey: DataDocKeys.unitPrice,
                resizable: true,
                editable: true,
                formatter: NumberRightFormatter
            },
            // unitPrice 2
            {
                key: DBDataRowKeys.unitPrice_2,
                name: `${Str.UnitPrice} 2`,
                ddKey: DataDocKeys.unitPrice,
                resizable: true,
                editable: true,
                formatter: NumberRightFormatter
            },
            // unitPrice 3
            {
                key: DBDataRowKeys.unitPrice_3,
                name: `${Str.UnitPrice} 3`,
                ddKey: DataDocKeys.unitPrice,
                resizable: true,
                editable: true,
                formatter: NumberRightFormatter
            }
        ];
        this.state = {
            columns,
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.rowGetter.bind(this);
        this.rowCount.bind(this);
    }
    // ReactDataGridへの参照
    grid: ReactDataGrid<DBDataRow> | null = null;

    componentWillMount = () => {
        // データロード
        this.props.queryDb();
    };
    rowGetter = (i: number) => {
        if (this.props.rows === null) {
            // 通常呼ばれないはずだが念のため
            return {} as DBDataRow;
        }
        return this.props.rows[i];
    };
    rowCount = () => {
        if (this.props.rows === null) {
            return 0;
        }
        return this.props.rows.length;
    };
    onRowsSelected = (rows: { rowIdx: number; row: DBDataRow }[]) => {
        if (this.props.selectRows) {
            this.props.selectRows(rows);
        }
    };
    onRowsDeselected = (rows: { rowIdx: number; row: DBDataRow }[]) => {
        if (this.props.deselectRows) {
            this.props.deselectRows(rows);
        }
    };
    handleAddRowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.addRow) {
            this.props.addRow();
        }
    };
    handleDeleteBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.deleteRows) {
            this.props.deleteRows();
        }
    };
    handleOnResize = () => {
        // console.log('handleOnResize');
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };
    render() {
        const { width, height } = this.state;
        const innerHeight = height;
        return (
            <div
                id="ManageDataDataGrid"
                className={this.props.classes.content}
                style={{ fontSize: '0.8125rem' }}
            >
                <EventListener target="window" onResize={this.handleOnResize} />

                <ReactDataGrid
                    ref={(node: ReactDataGrid<DBDataRow> | null) => {
                        this.grid = node;
                    }}
                    enableCellSelect={true}
                    // cellNavigationMode="changeRow"
                    rowSelection={{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            isSelectedKey: DBDataRowKeys.selected
                        }
                    }}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    rowHeight={ROW_HEIGHT}
                    headerRowHeight={HEADER_ROW_HEIGHT}
                    minHeight={
                        innerHeight -
                        64 /* AppBar height */ -
                        56 /* Padding */ -
                        48 /* Command Bar Height */
                    }
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    toolbar={
                        <Toolbar>
                            <button
                                type="button"
                                className="btn"
                                onClick={this.handleAddRowBtn}
                                style={{ marginLeft: 2 }}
                            >
                                <AddCircle />
                                {BtnLabel.AddRow}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={this.handleDeleteBtn}
                                disabled={this.props.selectedRowsCount === 0 ? true : false}
                                style={{ marginLeft: 2 }}
                            >
                                <RemoveCircle />
                                {BtnLabel.DeleteRows}
                            </button>
                        </Toolbar>
                    }
                />
                <br />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ManageDataDataGridComponent);
