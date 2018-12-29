/**
 * ManageDataComponent
 */

import * as React from 'react';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
// tslint:disable-next-line:import-name
import CreateIcon from '@material-ui/icons/Create';

import ManageDataDataGridComponent, {
    ManageDataDataGridComponentStateProps,
    ManageDataDataGridComponentDispatchProps
} from './ManageDataDataGridComponent';
import NotifyComponent, {
    NotifyComponentStateProps,
    NotifyComponentDispatchProps
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
export type ManageDataComponentStateProps = ManageDataDataGridComponentStateProps & {
    // TODO:
    // title: string;
    // edittingTitle: boolean;
    // totalPrice?: number;
    // and so on
};

export type ManageDataComponentDispatchProps = ManageDataDataGridComponentDispatchProps & {
    // startEdittingTitle: () => void;
    // endEdittingTitle: (title: string) => void;
};

/**
 * ManageDataComponent
 */
const ManageDataComponent: React.SFC<
    ManageDataComponentStateProps &
        ManageDataComponentDispatchProps &
        WithStyles<
            typeof styles
        > /*&
        INotifyComponentStateProps &
        INotifyComponentDispatchProps*/
> = props => {
    // TODO:
    const { classes, /*notifyContext,*/ ...rest } = props;

    return (
        <div className={classes.root}>
            <main>
                <div
                    // tslint:disable-next-line:jsx-no-lambda
                    onLoad={(e: React.SyntheticEvent<HTMLDivElement>) => {
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
