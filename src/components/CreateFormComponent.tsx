//
// CreateFormComponent
//
'use strict';

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CreateFormDataGridComponent, {
    ICreateFormDataGridComponentProps
} from './CreateFormDataGridComponent';

// CreateFormComponent
export interface ICreateFormComponentProps extends ICreateFormDataGridComponentProps {
    // TODO:
    title?: string;
    // totalPrice?: number;

    // and so on
}
const CreateFormComponent: React.SFC<ICreateFormComponentProps> = props => {
    // TODO:
    const { title, totalPrice, ...rest } = props;

    return (
        <div>
            <AppBar position="static">
                <Typography variant="title" color="inherit" noWrap={true}>
                    帳票作成
                </Typography>
            </AppBar>
            <main>
                <div>
                    <div className="text-center">
                        <h1>{title}</h1>
                    </div>
                    <br />
                    <CreateFormDataGridComponent {...rest} />
                </div>
            </main>
        </div>
    );
};

export default CreateFormComponent;
