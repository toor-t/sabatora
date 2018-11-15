/**
 * AboutComponent
 */
'use strict';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Title } from '../strings';
const img = require('../../build/icon.png');

const styles = () =>
    createStyles({
        div: {
            textAlign: 'center'
        },
        img: {
            width: '30%'
        }
    });

export interface IAboutComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}

const AboutComponent: React.SFC<IAboutComponentProps & WithStyles<typeof styles>> = props => {
    // TODO:
    const { checked, onChange } = props;
    return (
        <div>
            <div className={props.classes.div}>
                <img src={img} className={props.classes.img} />
            </div>
            <Typography
                variant="title"
                color="inherit"
                style={{ flexGrow: 1 }}
                noWrap={true}
                align="center"
            >
                <br />
                sabatora.
                <br />
                (C)2018 toor-t
            </Typography>
        </div>
    );
};

export default withStyles(styles)(AboutComponent);
