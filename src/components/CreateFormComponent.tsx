//
// CreateFormComponent
//
'use strict';

import * as React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
            <main>
                <div>
                    <Typography variant="display2" align="center">
                        {title}
                    </Typography>
                    <br />
                    <CreateFormDataGridComponent {...rest} />
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(CreateFormComponent);
