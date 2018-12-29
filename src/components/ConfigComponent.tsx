/**
 * ConfigComponent
 */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Title } from '../strings';

export type ConfigComponentStateProps = {
    // TODO:
    // checked?: boolean;
};
export type ConfigComponentDispatchProps = {
    // TODO:
    // onChange?: (e: any) => any;
};
const ConfigComponent: React.SFC<
    ConfigComponentStateProps & ConfigComponentDispatchProps
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
