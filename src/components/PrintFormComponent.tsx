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
import { FormDataRow, TotalPriceRowKeys, TotalPriceRow } from '../states/CreateFormState';
import { TableFooter } from '@material-ui/core';

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
            flexGrow: 1
        },
        grow: {
            flexGrow: 1
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20
        },
        button: {
            margin: theme.spacing.unit
        },
        container: {
            display: 'inline',
            flexWrap: 'wrap'
        },
        input: {
            margin: theme.spacing.unit
        },
        flexbox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            textAlign: 'center'
            // height: 150,
            // padding: 10,
            // margin: 20,
        }
    });
export interface IPrintFormComponentStateProps {
    title: string;
    rows: any[];
}

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

    return (
        <div className={classes.root}>
            <main>
                <div id="PrintFormComponent">
                    {/* タイトル表示 */}
                    <Typography variant="display1" align="center">
                        {title}
                    </Typography>

                    {/* 表 */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="dense">No.</TableCell>
                                <TableCell padding="dense">大項目</TableCell>
                                <TableCell padding="dense">中項目</TableCell>
                                <TableCell padding="dense">小項目</TableCell>
                                <TableCell padding="dense">名称</TableCell>
                                <TableCell padding="dense" numeric={true}>
                                    単価
                                </TableCell>
                                <TableCell padding="dense" numeric={true}>
                                    個数
                                </TableCell>
                                <TableCell padding="dense" numeric={true}>
                                    価格
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => {
                                return row.totalPrice ? (
                                    <TableRow key={row.id}>
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell padding="dense" numeric={true}>
                                            <Typography>合計:</Typography>
                                        </TableCell>
                                        <TableCell padding="dense" numeric={true}>
                                            {NumberFormatter(row.totalPrice)}
                                        </TableCell>
                                    </TableRow>
                                ) : row.subtotalPrice ? (
                                    <TableRow key={row.id}>
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell padding="dense" numeric={true}>
                                            小計:
                                        </TableCell>
                                        <TableCell padding="dense" numeric={true}>
                                            {NumberFormatter(row.subtotalPrice)}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow key={row.id}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="dense"
                                            numeric={true}
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell padding="dense">{row.level_1}</TableCell>
                                        <TableCell padding="dense">{row.level_2}</TableCell>
                                        <TableCell padding="dense">{row.level_3}</TableCell>
                                        <TableCell padding="dense">{row.itemName}</TableCell>
                                        <TableCell padding="dense" numeric={true}>
                                            {NumberFormatter(row.unitPrice)}
                                        </TableCell>
                                        <TableCell padding="dense" numeric={true}>
                                            {NumberFormatter(row.num)}
                                        </TableCell>
                                        <TableCell padding="dense" numeric={true}>
                                            {NumberFormatter(row.price)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow key={rows[rows.length - 1].id}>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell padding="dense" numeric={true}>
                                    <Typography>合計:</Typography>
                                </TableCell>
                                <TableCell padding="dense" numeric={true}>
                                    {NumberFormatter(rows[rows.length - 1].totalPrice)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(PrintFormComponent);
