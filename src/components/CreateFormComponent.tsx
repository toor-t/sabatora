//
// CreateFormComponent
//
'use strict';

import * as React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

import CreateFormDataGridComponent, {
    ICreateFormDataGridComponentProps
} from './CreateFormDataGridComponent';

// CreateFormComponent

const styles = createStyles({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});
export interface ICreateFormComponentProps extends ICreateFormDataGridComponentProps {
    // TODO:
    title?: string;
    // totalPrice?: number;

    // and so on
}

const CreateFormComponent: React.SFC<
    ICreateFormComponentProps & WithStyles<typeof styles>
> = props => {
    // TODO:
    const { classes, title, totalPrice, ...rest } = props;

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit"
                        noWrap={true}
                        className={classes.grow}
                    >
                        帳票作成
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <div className="text-center">
                        <Typography variant="display2" align="center">
                            {title}
                        </Typography>
                    </div>
                    <br />
                    <CreateFormDataGridComponent {...rest} />
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(CreateFormComponent);
