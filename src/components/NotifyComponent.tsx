/**
 * NotificationComponent
 */
'use strict';

import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
// tslint:disable-next-line:import-name
import CloseIcon from '@material-ui/icons/Close';
import { ActionCreator } from 'typescript-fsa';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IAppState } from '../store';

const styles = (theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing.unit / 2
        }
    });

type ThunkActionType = (() => (
    dispatch: ThunkDispatch<IAppState, undefined, Action<void>>,
    getState: () => IAppState
) => void);
type ThunkDispatchActionType = ThunkActionType | ActionCreator<void> | undefined;

/**
 * NotifyContext
 */
export class NotifyContext {
    public readonly message: string;
    public readonly type: number;
    public readonly open: boolean;
    public readonly duration: number;
    public readonly title: string;
    public readonly cancelTitle: string;
    public readonly okTitle: string;
    public readonly onNotificationClose: ThunkDispatchActionType;
    public readonly onCloseButtonClick: ThunkDispatchActionType;
    public readonly onCancelButtonClick: ThunkDispatchActionType;
    public readonly onOKButtonClick: ThunkDispatchActionType;

    constructor(
        message: string,
        type: number = 0,
        open: boolean = true,
        duration: number = 3000,
        title: string = '',
        cancelTitle: string = 'キャンセル',
        okTitle: string = 'OK',
        onNotificationClose: ThunkDispatchActionType,
        onCloseButtonClick: ThunkDispatchActionType,
        onCancelButtonClick: ThunkDispatchActionType = undefined,
        onOKButtonClick: ThunkDispatchActionType = undefined
    ) {
        this.message = message;
        this.type = type;
        this.open = open;
        this.duration = duration;
        this.title = title;
        this.cancelTitle = cancelTitle;
        this.okTitle = okTitle;
        this.onNotificationClose = onNotificationClose;
        this.onCloseButtonClick = onCloseButtonClick;
        this.onCancelButtonClick = onCancelButtonClick;
        this.onOKButtonClick = onOKButtonClick;
    }
    public static defaultNotify = (
        message: string,
        notifyClose: ThunkDispatchActionType
    ): NotifyContext => {
        return new NotifyContext(message, 0, true, 3000, '', '', '', notifyClose, notifyClose);
    };
    public static emptyNotify = (): NotifyContext => {
        return new NotifyContext('', 0, false, 0, '', '', '', undefined, undefined);
    };
    public closedNotify = (): NotifyContext => {
        return new NotifyContext(
            this.message,
            this.type,
            false,
            0,
            this.title,
            this.cancelTitle,
            this.okTitle,
            this.onNotificationClose,
            this.onCloseButtonClick,
            this.onCancelButtonClick,
            this.onOKButtonClick
        );
    };
    public createDialog = (
        title: string,
        message: string,
        cancelTitle: string,
        okTitle: string,
        cancelButtonClick: ThunkDispatchActionType,
        okButtonClick: ThunkDispatchActionType
    ): NotifyContext => {
        return new NotifyContext(
            message,
            1,
            true,
            0,
            title,
            cancelTitle,
            okTitle,
            undefined,
            undefined,
            cancelButtonClick,
            okButtonClick
        );
    };
}

/**
 * INotifyComponentStateProps
 */
export interface INotifyComponentStateProps {
    notifyContext: NotifyContext;
}
/**
 * INotifyComponentDispatchProps
 */
export interface INotifyComponentDispatchProps {
    dispatch?: ThunkDispatch<IAppState, undefined, Action<void>>;
}
/**
 * INotifyComponentStates
 */
interface INotifyComponentStates {}
/**
 * NotifyComponent
 */
class NotifyComponent extends React.Component<
    INotifyComponentStateProps & INotifyComponentDispatchProps & WithStyles<typeof styles>,
    INotifyComponentStates
> {
    handleCloseButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        // TODO:
        this.props.notifyContext.onCloseButtonClick &&
            this.props.dispatch &&
            this.props.dispatch(this.props.notifyContext.onCloseButtonClick() as any); // TODO: この as any を止める方法は無いものか
    };

    handleCancelButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        // TODO:
        this.props.notifyContext.onCancelButtonClick &&
            this.props.dispatch &&
            this.props.dispatch(this.props.notifyContext.onCancelButtonClick() as any); // TODO: この as any を止める方法は無いものか
    };

    handleOKButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        // TODO:
        this.props.notifyContext.onOKButtonClick &&
            this.props.dispatch &&
            this.props.dispatch(this.props.notifyContext.onOKButtonClick() as any); // TODO: この as any を止める方法は無いものか
    };

    handleSnackbarClose = (event: React.SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // TODO:
        this.props.notifyContext.onNotificationClose &&
            this.props.dispatch &&
            this.props.dispatch(this.props.notifyContext.onNotificationClose() as any); // TODO: この as any を止める方法は無いものか
    };

    handleDialogClose = () => {
        this.props.notifyContext.onNotificationClose &&
            this.props.dispatch &&
            this.props.dispatch(this.props.notifyContext.onNotificationClose() as any); // TODO: この as any を止める方法は無いものか
    };

    dialogTransition = (props: SlideProps) => {
        return <Slide direction="up" {...props} />;
    };

    render() {
        const { classes } = this.props;

        let Notify: JSX.Element = <div />;
        switch (this.props.notifyContext.type) {
            case 0: // Snackbar
                Notify = (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        open={this.props.notifyContext.open}
                        autoHideDuration={this.props.notifyContext.duration}
                        onClose={this.handleSnackbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id'
                        }}
                        message={<span id="message-id">{this.props.notifyContext.message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleCloseButtonClick}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                );
                break;
            case 1:
                // TODO: Dialog
                Notify = (
                    <Dialog
                        open={this.props.notifyContext.open}
                        TransitionComponent={this.dialogTransition}
                        keepMounted={true}
                        // onClose={this.handleDialogClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        {this.props.notifyContext.title !== '' && (
                            <DialogTitle id="alert-dialog-slide-title">
                                {this.props.notifyContext.title}
                            </DialogTitle>
                        )}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {this.props.notifyContext.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCancelButtonClick} color="primary">
                                {this.props.notifyContext.cancelTitle}
                            </Button>
                            <Button onClick={this.handleOKButtonClick} color="primary">
                                {this.props.notifyContext.okTitle}
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
                break;

            default:
                break;
        }

        return <div>{Notify}</div>;
    }
}

export default withStyles(styles)(NotifyComponent);
