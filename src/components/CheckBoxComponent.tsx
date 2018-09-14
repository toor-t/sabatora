import Paper from '@material-ui/core/Paper';
import * as React from 'react';

export const checkBoxComponent: React.SFC = () => {
    return (
        <div>
            <input type="checkbox" /> <br />
            <div>
                <Paper elevation={1}>ペーパー</Paper>
            </div>
        </div>
    );
};
