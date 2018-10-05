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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

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
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                        帳票作成
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <div className="text-center">
                        <Typography variant="display2" align="center">
                            {title}
                        </Typography>
                    </div>
                    <br />
                    <CreateFormDataGridComponent {...rest} />
                </div>
            </main>
        </div>
    );
};

export default CreateFormComponent;
