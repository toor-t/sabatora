//
// CreateFormComponent
//
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
        }
    });
export interface ICreateFormComponentStateProps extends ICreateFormDataGridComponentStateProps {
    // TODO:
    title: string;
    edittingTitle: boolean;
    // totalPrice?: number;

    // and so on
}

export interface ICreateFormComponentDispatchProps
    extends ICreateFormDataGridComponentDispatchProps {
    // TODO:
    startEdittingTitle: () => void;
    endEdittingTitle: (title: string) => void;
}

const CreateFormComponent: React.SFC<
    ICreateFormComponentStateProps & ICreateFormComponentDispatchProps & WithStyles<typeof styles>
> = props => {
    // TODO:
    const { classes, title, startEdittingTitle, edittingTitle, endEdittingTitle, ...rest } = props;

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
                        // TODO: タイトル編集中
                        <div className={classes.container}>
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
                </div>
            </main>
        </div>
    );
};

export default withStyles(styles)(CreateFormComponent);
