/**
 * NotificationComponent
 */
'use strict';

import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// tslint:disable-next-line:import-name
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing.unit / 2
        }
    });

// export type NotifyContext = {
// 	message: string;
// 	open: boolean;
// 	duration: number;
// }
export class NotifyContext {
    public readonly message: string;
    public readonly type: number;
    public readonly open: boolean;
    public readonly duration: number;
    constructor(message: string, type: number = 0, open: boolean = true, duration: number = 3000) {
        this.message = message;
        this.type = type;
        this.open = open;
        this.duration = duration;
    }
    public static defaultNotify = (message: string): NotifyContext => {
        return new NotifyContext(message);
    };
    public static emptyNotify = (): NotifyContext => {
        return new NotifyContext('', 0, false, 0);
    };
    public closedNotify = (): NotifyContext => {
        return new NotifyContext(this.message, this.type, false, 0);
    };
}

export interface INotifyComponentStateProps {
    notifyContext: NotifyContext;
}
export interface INotifyComponentDispatchProps {
    onNotificationClose: () => void;
    onCloseButtonClick: () => void;
}
interface INotifyComponentStates {}
class NotifyComponent extends React.Component<
    INotifyComponentStateProps & INotifyComponentDispatchProps & WithStyles<typeof styles>,
    INotifyComponentStates,
    any
> {
    handleButtonClick = (event: any) => {
        // TODO:
        this.props.onCloseButtonClick();
    };

    handleSnackbarClose = (event: React.SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // TODO:
        this.props.onNotificationClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                            onClick={this.handleButtonClick}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(NotifyComponent);
