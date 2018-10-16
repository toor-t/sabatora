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
        onNotificationClose,
        onCloseButtonClick,
        ...rest
    } = props;

    return (
        <div className={classes.root}>
            <main>
                <div>
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

                    <NotifyComponent
                        notifyContext={notifyContext}
                        onNotificationClose={onNotificationClose}
                        onCloseButtonClick={onCloseButtonClick}
                    />
                </div>
            </main>
        </div>
    );
};

/**
 * 帳票作成コンポーネント
 * @abstract 帳票作成コンポーネントですよ
 */
export default withStyles(styles)(CreateFormComponent);
