'use strict';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';

export interface ICheckBoxComponentProps {
    checked?: boolean;
    onChange?: (e: any) => any;
}

const CheckBoxComponent: React.SFC<ICheckBoxComponentProps> = props => {
    const { checked, onChange } = props;
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} /> <br />
            <div>
                <Paper elevation={3}> {checked ? 'TRUE' : 'FALSE'} </Paper>
            </div>
        </div>
    );
};

export default CheckBoxComponent;
