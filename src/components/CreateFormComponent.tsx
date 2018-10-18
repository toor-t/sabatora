/**
 * CreateFormComponent
 */
'use strict';
import * as React from 'react';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// tslint:disable-next-line:import-name
import CreateIcon from '@material-ui/icons/Create';

import CreateFormDataGridComponent, {
    ICreateFormDataGridComponentStateProps,
    ICreateFormDataGridComponentDispatchProps
} from './CreateFormDataGridComponent';
import NotifyComponent, {
    INotifyComponentStateProps,
    INotifyComponentDispatchProps
} from './NotifyComponent';
import PrintFormComponent from './PrintFormComponent';

// CreateFormComponent

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
export interface ICreateFormComponentStateProps extends ICreateFormDataGridComponentStateProps {
    title: string;
    edittingTitle: boolean;
    formDataEditted: boolean;
    // TODO: 印刷処理
    printing: boolean;
}

export interface ICreateFormComponentDispatchProps
    extends ICreateFormDataGridComponentDispatchProps {
    startEdittingTitle: () => void;
    endEdittingTitle: (title: string) => void;
}

/**
 * 帳票作成コンポーネント
 * @abstract 帳票作成コンポーネント
 */
const CreateFormComponent: React.SFC<
    ICreateFormComponentStateProps &
        ICreateFormComponentDispatchProps &
        WithStyles<typeof styles> &
        INotifyComponentStateProps &
        INotifyComponentDispatchProps
> = props => {
    const {
        classes,
        title,
        startEdittingTitle,
        edittingTitle,
        endEdittingTitle,
        notifyContext,
        dispatch, // TODO: 実験中
        printing, // TODO: 実験中
        ...rest
    } = props;

    return (
        <div className={classes.root}>
            <main>
                {!printing ? (
                    <div id="CreateFormComponent">
                        {!edittingTitle ? (
                            // タイトル通常表示
                            <Typography variant="display1" align="center">
                                {title}
                                <IconButton
                                    className={classes.button}
                                    aria-label="Delete"
                                    onClick={startEdittingTitle}
                                >
                                    <CreateIcon />
                                </IconButton>
                            </Typography>
                        ) : (
                            // TODO: タイトル編集中 編集終了ボタンが欲しい？
                            <div className={classes.flexbox}>
                                <Input
                                    autoFocus={true}
                                    className={classes.input}
                                    type="text"
                                    placeholder="Title"
                                    defaultValue={title}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onBlur={(e: any) => {
                                        endEdittingTitle(e.target.value);
                                    }}
                                    inputProps={{
                                        'aria-label': 'Description'
                                    }}
                                />
                            </div>
                        )}
                        <br />
                        <CreateFormDataGridComponent {...rest} />

                        <NotifyComponent notifyContext={notifyContext} dispatch={dispatch} />
                    </div>
                ) : (
                    <PrintFormComponent title={title} rows={props.rows} />
                )}
            </main>
        </div>
    );
};

/**
 * 帳票作成コンポーネント
 * @abstract 帳票作成コンポーネントですよ
 */
export default withStyles(styles)(CreateFormComponent);
