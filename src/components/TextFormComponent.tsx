'use strict';
import * as React from 'react';
import { ITextFormActions } from '../actions/TextFormAction';
import { ITextFormState } from '../states/TextFormState';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            display: 'inline',
            flexWrap: 'wrap'
        },
        input: {
            margin: theme.spacing.unit
        }
    });

export interface ITextFormComponentProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: any) => any;
}

type _ITextFormComponentProps = ITextFormComponentProps & WithStyles<typeof styles>;

const TextFormComponent: React.SFC<_ITextFormComponentProps> = props => {
    const { placeholder, value, onChange } = props;
    const { classes } = props;
    return (
        <div>
            <div className={classes.container}>
                <Input
                    className={classes.input}
                    type="text"
                    placeholder={placeholder == null ? 'value' : placeholder}
                    value={value}
                    onChange={onChange}
                    inputProps={{
                        'aria-label': 'Description'
                    }}
                />
            </div>
            <br />
            <h1>{value}</h1>
            <br />
        </div>
    );
};

export default withStyles(styles)(TextFormComponent);
