/**
 * ManageDataComponent
 */
'use strict';
import * as React from 'react';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// tslint:disable-next-line:import-name
import CreateIcon from '@material-ui/icons/Create';

import ManageDataDataGridComponent, {
    IManageDataDataGridComponentStateProps,
    IManageDataDataGridComponentDispatchProps
} from './ManageDataDataGridComponent';
import NotifyComponent, {
    INotifyComponentStateProps,
    INotifyComponentDispatchProps
} from './NotifyComponent';

// ManageDataComponent

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
export interface IManageDataComponentStateProps extends IManageDataDataGridComponentStateProps {
    // TODO:
    // title: string;
    // edittingTitle: boolean;
    // totalPrice?: number;
    // and so on
}

export interface IManageDataComponentDispatchProps
    extends IManageDataDataGridComponentDispatchProps {
    // TODO:
    queryDb: () => void;
    // startEdittingTitle: () => void;
    // endEdittingTitle: (title: string) => void;
}

/**
 * ManageDataComponent
 */
const ManageDataComponent: React.SFC<
    IManageDataComponentStateProps &
        IManageDataComponentDispatchProps &
        WithStyles<typeof styles> &
        INotifyComponentStateProps &
        INotifyComponentDispatchProps
> = props => {
    // TODO:
    const { classes, notifyContext, onNotificationClose, onCloseButtonClick, ...rest } = props;

    return (
        <div className={classes.root}>
            <main>
                <div
                    // tslint:disable-next-line:jsx-no-lambda
                    onLoad={(e: any) => {
                        props.queryDb();
                    }}
                >
                    <ManageDataDataGridComponent {...rest} />

                    {/* <NotifyComponent
							notifyContext={notifyContext}
							onNotificationClose={onNotificationClose}
							onCloseButtonClick={onCloseButtonClick}
						/> */}
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(ManageDataComponent);
