//
// ConfigComponent
//
'use strict';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';

export interface IConfigComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}
const ConfigComponent: React.SFC<IConfigComponentProps> = props => {
    // TODO:
    const { checked, onChange } = props;
    return (
        <div>
            <Typography
                variant="title"
                color="inherit"
                style={{ flexGrow: 1 }}
                noWrap={true}
                align="center"
            >
                設定
            </Typography>
        </div>
    );
};

export default ConfigComponent;
