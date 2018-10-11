//
// ManageDataComponent
//
'use strict';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';

export interface IManageDataComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}
const ManageDataComponent: React.SFC<IManageDataComponentProps> = props => {
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
                データ管理
            </Typography>
        </div>
    );
};

export default ManageDataComponent;
