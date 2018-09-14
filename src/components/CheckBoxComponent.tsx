import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { ICheckBoxActions } from '../actions/CheckBoxAction';
import { ICheckBoxState } from '../states/CheckBoxState';

type Props = ICheckBoxState & ICheckBoxActions;

export const CheckBoxComponent: React.SFC<Props> = props => {
    return (
        <div>
            <input
                type="checkbox"
                checked={props.value}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={e => props.updateValue(e.target.checked)}
            />{' '}
            <br />
            <div>
                <Paper elevation={3}> {props.value ? 'TRUE' : 'FALSE'} </Paper>
            </div>
        </div>
    );
};
