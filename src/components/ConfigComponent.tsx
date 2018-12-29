/**
 * ConfigComponent
 */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Title } from '../strings';

export interface IConfigComponentStateProps {
    // TODO:
    // checked?: boolean;
}
export interface IConfigComponentDispatchProps {
    // TODO:
    // onChange?: (e: any) => any;
}
const ConfigComponent: React.SFC<
    IConfigComponentStateProps & IConfigComponentDispatchProps
> = props => {
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
