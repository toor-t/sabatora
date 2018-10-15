/**
 * ManageDataDataGridComponent
 */

// TODO:
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
    SubtotalPriceRowKeys
} from '../states/CreateFormState';
import { DataDocKeys, DataDoc } from '../db';
import AddCircle from '@material-ui/icons/AddCircle';
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import * as classNames from 'classnames';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DBDataRowKeys, DBDataRow } from '../states/ManageDataState';

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

// // TODO: Row render
// interface ICustomRowRendererStates {
// 	grid: ManageDataDataGridComponent;
// }
// class CustomRowRenderer extends React.Component<any, ICustomRowRendererStates> {
// 	constructor(props: any) {
// 		super(props);
// 		this.state = {
// 			grid: this.props.grid
// 		};
// 	}

// 	row: any;

// 	shouldComponentUpdate(nextProps: any) {
// 		return this.row.shouldComponentUpdate(nextProps);
// 	}
// 	setScrollLeft = (scrollBy: any) => {
// 		// if you want freeze columns to work, you need to make sure you implement this as apass through
// 		if (this.row.setScrollLeft) {
// 			this.row.setScrollLeft(scrollBy);
// 		}
// 	};
// 	getRowStyle = () => {
// 		return {
// 			backgroundColor: this.getRowBackground()
// 		};
// 	};
// 	getRowBackground = () => {
// 		return this.props.idx % 2 ? 'green' : 'blue';
// 	};
// 	render() {
// 		const { columns, ...other } = this.props;
// 		let _columns = columns;

// 		if (this.props.row[TotalPriceRowKeys.totalPrice] !== undefined) {
// 			// TODO: 合計表示
// 			const check_column = Object.assign(
// 				{},
// 				columns[0],
// 				{ key: undefined },
// 				{ formatter: undefined }
// 			);

// 			let l_column = {}; // 左端のカラムの情報
// 			let width = 0;
// 			for (let i = 1; i < columns.length - 1; i = i + 1) {
// 				width += columns[i].width;
// 			}
// 			l_column = Object.assign(
// 				l_column,
// 				columns[1],
// 				{ width },
// 				{ key: TotalPriceRowKeys.labelTotalPrice },
// 				{ formatter: BoldRightFormatter }
// 			);
// 			const dummy_column = Object.assign(
// 				{},
// 				columns[1],
// 				{ width },
// 				{ key: undefined },
// 				{ formatter: undefined },
// 				{ hidden: true }
// 			);
// 			let r_column = {}; // 右端のカラムの情報
// 			r_column = Object.assign(
// 				r_column,
// 				columns[columns.length - 1],
// 				{ key: TotalPriceRowKeys.totalPrice },
// 				{ formatter: BoldNumberRightFormatter }
// 			);
// 			_columns = [];
// 			_columns.push(check_column);
// 			for (let i = 1; i < columns.length - 2; i = i + 1) {
// 				_columns.push(Object.assign({}, dummy_column, { key: `dummy-${i}` }));
// 			}
// 			_columns.push(l_column);
// 			_columns.push(r_column);
// 			return (
// 				// <div>
// 				<ReactDataGrid.Row
// 					ref={node => (this.row = node)}
// 					forceUpdate={true}
// 					columns={_columns}
// 					{...other}
// 				/>
// 				// </div>
// 			);
// 		}
// 		if (this.props.row[SubtotalPriceRowKeys.subtotalPrice] !== undefined) {
// 			// TODO: 小計表示
// 			const check_column = columns[0]; // チェックボックスカラム

// 			let l_column = {}; // 左端のカラムの情報
// 			let width = 0;
// 			for (let i = 1; i < columns.length - 1; i = i + 1) {
// 				width += columns[i].width;
// 			}
// 			l_column = Object.assign(
// 				l_column,
// 				columns[1],
// 				{ width },
// 				{ key: SubtotalPriceRowKeys.labelSubtotalPrice },
// 				{ formatter: RightFormatter }
// 			);
// 			const dummy_column = Object.assign(
// 				{},
// 				columns[1],
// 				{ width },
// 				{ key: undefined },
// 				{ formatter: undefined },
// 				{ hidden: true }
// 			);
// 			let r_column = {}; // 右端のカラムの情報
// 			r_column = Object.assign(
// 				r_column,
// 				columns[columns.length - 1],
// 				{ key: SubtotalPriceRowKeys.subtotalPrice },
// 				{ formatter: NumberRightFormatter }
// 			);
// 			_columns = [];
// 			_columns.push(check_column);
// 			for (let i = 1; i < columns.length - 2; i = i + 1) {
// 				_columns.push(Object.assign({}, dummy_column, { key: `dummy-${i}` }));
// 			}
// 			_columns.push(l_column);
// 			_columns.push(r_column);
// 			return (
// 				// <div>
// 				<ReactDataGrid.Row
// 					ref={node => (this.row = node)}
// 					forceUpdate={true}
// 					columns={_columns}
// 					{...other}
// 				/>
// 				// </div>
// 			);
// 		}
// 		// 通常行
// 		return (
// 			// <div>
// 			<ReactDataGrid.Row ref={node => (this.row = node)} columns={_columns} {...other} />
// 			// </div>
// 		);
// 	}
// }

// ManageDataDataGridComponent
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

export interface IManageDataDataGridComponentStateProps {
    // TODO:
    rows?: DataDoc[];
    // autoCompleteOptions: {};
}
export interface IManageDataDataGridComponentDispatchProps {
    // TODO:
    queryDb: () => void;
    // TODO:
    // onGridRowUpdate: (e: ReactDataGrid.GridRowsUpdatedEvent) => void;
    // onSelectedCell: (col: { rowIdx: number; idx: number }) => void;
    // updateAutoCompleteOptions: (col: { rowData: NormalDataRow; columnDDKey: string }) => void;
    // addRow: () => void;
    // deleteRows: () => void;
    // selectRows: (rows: { rowIdx: number; row: FormData }[]) => void;
    // deselectRows: (rows: { rowIdx: number; row: FormData }[]) => void;
    // addSubtotalRow: () => void;
}
interface IManageDataDataGridComponentStates {
    columns: any[];
    // TODO: 実験
    rows: DataDoc[] | null;
}
class ManageDataDataGridComponent extends React.Component<
    IManageDataDataGridComponentStateProps &
        IManageDataDataGridComponentDispatchProps &
        WithStyles<typeof styles>,
    IManageDataDataGridComponentStates
> {
    constructor(
        props: IManageDataDataGridComponentStateProps &
            IManageDataDataGridComponentDispatchProps &
            WithStyles<typeof styles>
    ) {
        super(props);
        // カラム定義
        const columns: (ReactDataGrid.Column<NormalDataRow> & { ddKey?: string })[] = [
            {
                key: DBDataRowKeys.id,
                name: 'No.',
                width: 48,
                formatter: CenterFormatter
            },
            {
                key: DBDataRowKeys.level_1,
                name: '大分類',
                ddKey: DataDocKeys.level_1,
                editable: true
            },
            {
                key: DBDataRowKeys.level_2,
                name: '中分類',
                ddKey: DataDocKeys.level_2,
                editable: true
            },
            {
                key: DBDataRowKeys.level_3,
                name: '小分類',
                ddKey: DataDocKeys.level_3,
                editable: true
            },
            {
                key: DBDataRowKeys.itemName,
                name: '名称',
                ddKey: DataDocKeys.itemName,
                editable: true
            },
            {
                key: DBDataRowKeys.unitPrice_1,
                name: '単価 1',
                ddKey: DataDocKeys.unitPrice,
                editable: true,
                formatter: NumberRightFormatter
            },
            {
                key: DBDataRowKeys.unitPrice_2,
                name: '単価 2',
                ddKey: DataDocKeys.unitPrice,
                editable: true,
                formatter: NumberRightFormatter
            },
            {
                key: DBDataRowKeys.unitPrice_3,
                name: '単価 3',
                ddKey: DataDocKeys.unitPrice,
                editable: true,
                formatter: NumberRightFormatter
            }
        ];
        this.state = {
            columns,
            rows: null
        };
        this.rowGetter.bind(this);
        this.rowCount.bind(this);
        // this.handleCellSeceted.bind(this);
    }
    // ReactDataGridへの参照
    grid: any = {};

    // TODO:  実験
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
        if (this.props.rows) {
            this.setState({ rows: this.props.rows });
        }
    }
    rowGetter = (i: number) => {
        if (this.state.rows === null) {
            // TODO: 通常呼ばれないはずだが念のため
            return {};
        }
        const row = this.state.rows[i];
        const unitPrice_1 = row[DataDocKeys.unitPrice][0];
        const unitPrice_2 = row[DataDocKeys.unitPrice][1];
        const unitPrice_3 = row[DataDocKeys.unitPrice][2];
        return Object.assign({}, row, {
            [DBDataRowKeys.unitPrice_1]: unitPrice_1,
            [DBDataRowKeys.unitPrice_2]: unitPrice_2,
            [DBDataRowKeys.unitPrice_3]: unitPrice_3
        });
    };
    rowCount = () => {
        if (this.state.rows === null) {
            // TODO: 実験中　データロード
            this.props.queryDb();
            // // TODO: この時点でstate.rowsに空データを代入しておく
            // this.setState({ rows: [] });
            return 0;
        }
        return this.state.rows.length;
    };
    // handleCellSeceted = (col: { rowIdx: number; idx: number }) => {
    // 	// TODO:
    // 	if (this.props.onSelectedCell) {
    // 		this.props.onSelectedCell(col);
    // 	}
    // 	// TODO: updateAutoCompleteOptions
    // 	if (
    // 		this.props.rows &&
    // 		(this.props.rows[col.rowIdx] as NormalDataRow)[NormalDataRowKeys.price] !== undefined
    // 	) {
    // 		// 通常行のみ。合計行等では更新しない
    // 		if (
    // 			col.idx > 1 &&
    // 			this.state.columns[col.idx /* 行選択チェックボックス分 */ - 1]['ddKey'] !==
    // 			undefined
    // 		) {
    // 			// DBに対応するデータがあるカラムのみ。
    // 			if (this.props.updateAutoCompleteOptions) {
    // 				this.props.updateAutoCompleteOptions({
    // 					rowData: this.props.rows[col.rowIdx] as NormalDataRow,
    // 					columnDDKey:
    // 						this.state.columns[col.idx - 1 /* チェックボックスの分引く */].ddKey !==
    // 							undefined
    // 							? this.state.columns[col.idx - 1 /* チェックボックスの分引く */]
    // 								.ddKey
    // 							: ''
    // 				});
    // 			}
    // 		}
    // 	}
    // };
    // onRowsSelected = (rows: any) => {
    // 	// TODO:
    // 	if (this.props.selectRows) {
    // 		this.props.selectRows(rows);
    // 	}
    // };
    // onRowsDeselected = (rows: any) => {
    // 	// TODO:
    // 	if (this.props.deselectRows) {
    // 		this.props.deselectRows(rows);
    // 	}
    // };
    // handleAddRowBtn = (e: any) => {
    // 	if (this.props.addRow) {
    // 		this.props.addRow();
    // 	}
    // };
    // handleDeleteBtn = (e: any) => {
    // 	if (this.props.deleteRows) {
    // 		this.props.deleteRows();
    // 	}
    // };
    // handleAddSubtotalBtn = (e: any) => {
    // 	if (this.props.addSubtotalRow) {
    // 		this.props.addSubtotalRow();
    // 	}
    // };
    render() {
        // TODO:
        return (
            <div id="CreateFormDataGrid" /*className={this.props.classes.content}*/>
                <ReactDataGrid
                    ref={node => {
                        this.grid = node;
                    }}
                    enableCellSelect={true}
                    cellNavigationMode="changeRow"
                    // rowSelection={{
                    // 	showCheckbox: true,
                    // 	enableShiftSelect: true,
                    // 	onRowsSelected: this.onRowsSelected,
                    // 	onRowsDeselected: this.onRowsDeselected,
                    // 	selectBy: {
                    // 		isSelectedKey: NormalDataRowKeys.selected
                    // 	}
                    // }}
                    columns={this.state.columns}
                    // tslint:disable-next-line:jsx-no-lambda
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    rowHeight={ROW_HEIGHT}
                    headerRowHeight={HEADER_ROW_HEIGHT}
                    minHeight={600}
                    // onGridRowsUpdated={this.props.onGridRowUpdate}
                    // onCellSelected={this.handleCellSeceted}
                    // toolbar={
                    // 	<Toolbar>
                    // 		<button type="button" className="btn" onClick={this.handleAddRowBtn}>
                    // 			<AddCircle />
                    // 			{'行追加'}
                    // 		</button>
                    // 		<button
                    // 			type="button"
                    // 			className="btn"
                    // 			onClick={this.handleAddSubtotalBtn}
                    // 		>
                    // 			<AddBox />
                    // 			{'小計行追加'}
                    // 		</button>
                    // 		<button type="button" className="btn" onClick={this.handleDeleteBtn}>
                    // 			<RemoveCircle />
                    // 			{'行削除'}
                    // 		</button>
                    // 	</Toolbar>
                    // }
                    // rowRenderer={CustomRowRenderer}
                />
                <br />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ManageDataDataGridComponent);
