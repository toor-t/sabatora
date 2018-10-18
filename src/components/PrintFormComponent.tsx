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

// import PrintFormDataGridComponent, {
// 	ICreateFormDataGridComponentStateProps,
// 	ICreateFormDataGridComponentDispatchProps
// } from './CreateFormDataGridComponent';
// import NotifyComponent, {
// 	INotifyComponentStateProps,
// 	INotifyComponentDispatchProps
// } from './NotifyComponent';

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
                                <TableCell>No.</TableCell>
                                <TableCell>大項目</TableCell>
                                <TableCell>中項目</TableCell>
                                <TableCell>小項目</TableCell>
                                <TableCell>名称</TableCell>
                                <TableCell>単価</TableCell>
                                <TableCell>個数</TableCell>
                                <TableCell>価格</TableCell>
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
                                        <TableCell numeric={true}>合計:</TableCell>
                                        <TableCell numeric={true}>{row.totalPrice}</TableCell>
                                    </TableRow>
                                ) : row.subtotalPrice ? (
                                    <TableRow key={row.id}>
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell numeric={true}>小計:</TableCell>
                                        <TableCell numeric={true}>{row.subtotalPrice}</TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow key={row.id}>
                                        <TableCell numeric={true}>{row.id}</TableCell>
                                        <TableCell>{row.level_1}</TableCell>
                                        <TableCell>{row.level_2}</TableCell>
                                        <TableCell>{row.level_3}</TableCell>
                                        <TableCell>{row.itemName}</TableCell>
                                        <TableCell numeric={true}>{row.unitPrice}</TableCell>
                                        <TableCell numeric={true}>{row.num}</TableCell>
                                        <TableCell numeric={true}>{row.price}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(PrintFormComponent);
