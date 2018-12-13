/**
 * ConfigComponent
 */
'use strict';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Title } from '../strings';

export interface IConfigComponentProps {
    // TODO:
    // checked?: boolean;
    // onChange?: (e: any) => any;
}
const ConfigComponent: React.SFC<IConfigComponentProps> = props => {
    // TODO:
    return (
        <div>
            <Typography
                variant="h6"
                color="inherit"
                style={{ flexGrow: 1 }}
                noWrap={true}
                align="center"
            >
                {Title.Config}
            </Typography>
        </div>
    );
};

export default ConfigComponent;
