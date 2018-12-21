/**
 * PrintFormComponent
 */
'use strict';
import * as React from 'react';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// tslint:disable-next-line:import-name
import CreateIcon from '@material-ui/icons/Create';
import {
    FormDataRow,
    TotalPriceRowKeys,
    SubtotalPriceRowKeys,
    NormalRowKeys,
    TotalPriceRow,
    SubtotalPriceRow,
    NormalRow,
    BaseRowKeys
} from '../states/CreateFormState';
import { TableFooter } from '@material-ui/core';
import { Str } from '../strings';

// import PrintFormDataGridComponent, {
// 	ICreateFormDataGridComponentStateProps,
// 	ICreateFormDataGridComponentDispatchProps
// } from './CreateFormDataGridComponent';
// import NotifyComponent, {
// 	INotifyComponentStateProps,
// 	INotifyComponentDispatchProps
// } from './NotifyComponent';

const NumberFormatter = (value: any): string => {
    if ((typeof value === 'number' && !isNaN(value)) || !isNaN(Number(value))) {
        const formattedValue: string = String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        return formattedValue;
    }
    // TODO:
    return value;
};

// PrintFormComponent

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto'
        },
        table: {
            minWidth: 700
        },
        row: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default
            }
        }
    });

/**
 * IPrintFormComponentStateProps
 */
export interface IPrintFormComponentStateProps {
    title: string;
    rows: FormDataRow[];
}
/**
 *  IPrintFormComponentDispatchProps
 */
export interface IPrintFormComponentDispatchProps {}
/**
 * 帳票印刷コンポーネント
 * @abstract 帳票印刷コンポーネント
 */
const PrintFormComponent: React.SFC<
    IPrintFormComponentStateProps & IPrintFormComponentDispatchProps & WithStyles<typeof styles>
> = props => {
    const {
        classes,
        title,
        rows,
        // TODO:
        ...rest
    } = props;

    const tableHeadContents: JSX.Element = (
        <TableRow>
            {/* No */}
            <TableCell padding="dense" numeric={true} style={{ width: 64 }}>
                {Str.No}
            </TableCell>
            {/* Level */}
            <TableCell padding="dense">{Str.Level_1}</TableCell>
            <TableCell padding="dense">{Str.Level_2}</TableCell>
            <TableCell padding="dense">{Str.Level_3}</TableCell>
            {/* ItemName */}
            <TableCell padding="dense">{Str.ItemName}</TableCell>
            {/* UnitPrice */}
            <TableCell padding="dense" numeric={true}>
                {Str.UnitPrice}
            </TableCell>
            {/* Num */}
            <TableCell padding="dense" numeric={true}>
                {Str.Num}
            </TableCell>
            {/* Price */}
            <TableCell padding="dense" numeric={true}>
                {Str.Price}
            </TableCell>
        </TableRow>
    );

    const tableBodyContents: JSX.Element[] = [];
    for (let rowsidx = 0; rowsidx < rows.length - 1; rowsidx += 1) {
        const row = rows[rowsidx];
        if (row.type === SubtotalPriceRowKeys.type) {
            // 小計行
            tableBodyContents.push(
                <TableRow key={row[BaseRowKeys.id]}>
                    {/* padings */}
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    {/* Subtotal Label */}
                    <TableCell padding="dense" numeric={true}>
                        {row[SubtotalPriceRowKeys.labelSubtotalPrice]}
                    </TableCell>
                    {/* Subtotal Price */}
                    <TableCell padding="dense" numeric={true}>
                        {NumberFormatter(row[SubtotalPriceRowKeys.subtotalPrice])}
                    </TableCell>
                </TableRow>
            );
        } else if (row.type === NormalRowKeys.type) {
            // 通常行
            tableBodyContents.push(
                <TableRow className={classes.row} key={row[BaseRowKeys.id]}>
                    {/* No */}
                    <TableCell component="th" scope="row" padding="dense" numeric={true}>
                        {row[BaseRowKeys.id]}
                    </TableCell>
                    {/* Level 1 */}
                    <TableCell padding="dense">{row[NormalRowKeys.level_1]}</TableCell>
                    {/* Level 2 */}
                    <TableCell padding="dense">{row[NormalRowKeys.level_2]}</TableCell>
                    {/* Level 3 */}
                    <TableCell padding="dense">{row[NormalRowKeys.level_3]}</TableCell>
                    {/* ItemName */}
                    <TableCell padding="dense">{row[NormalRowKeys.itemName]}</TableCell>
                    {/* UnitPrice */}
                    <TableCell padding="dense" numeric={true}>
                        {NumberFormatter(row[NormalRowKeys.unitPrice])}
                    </TableCell>
                    {/* Num */}
                    <TableCell padding="dense" numeric={true}>
                        {NumberFormatter(row[NormalRowKeys.num])}
                    </TableCell>
                    {/* Price */}
                    <TableCell padding="dense" numeric={true}>
                        {NumberFormatter(row[NormalRowKeys.price])}
                    </TableCell>
                </TableRow>
            );
        }
    }

    const row = rows[rows.length - 1] as TotalPriceRow; // TODO: 最後の行が合計行であることを決め打ちしているのはあまりよくない
    const tableFooterContents: JSX.Element = (
        <TableRow key={row[BaseRowKeys.id]}>
            {/* paddings */}
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            {/* TotalPrice label */}
            <TableCell padding="dense" numeric={true}>
                <Typography>{row[TotalPriceRowKeys.labelTotalPrice]}</Typography>
            </TableCell>
            {/* Total Price */}
            <TableCell padding="dense" numeric={true}>
                <Typography>{NumberFormatter(row[TotalPriceRowKeys.totalPrice])}</Typography>
            </TableCell>
        </TableRow>
    );

    return (
        <div className={classes.root}>
            <main>
                <div id="PrintFormComponent">
                    {/* タイトル表示 */}
                    <Typography variant="h4" align="center">
                        {title}
                    </Typography>

                    {/* 表 */}
                    <Table className={classes.table}>
                        <TableHead>{tableHeadContents}</TableHead>
                        <TableBody>{tableBodyContents}</TableBody>
                        <TableFooter>{tableFooterContents}</TableFooter>
                    </Table>
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(PrintFormComponent);
