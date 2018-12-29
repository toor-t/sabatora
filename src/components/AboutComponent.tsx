/**
 * AboutComponent
 */

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Title, Str } from '../strings';
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

/**
 *  AboutComponentStateProps
 */
export type AboutComponentStateProps = {
    // TODO:
    // checked?: boolean;
};
/**
 * AboutComponentDispatchProps
 */
export type AboutComponentDispatchProps = {
    // onChange?: (e: any) => any;
};
/**
 * AboutComponent
 * @param props
 */
const AboutComponent: React.SFC<
    AboutComponentStateProps & AboutComponentDispatchProps & WithStyles<typeof styles>
> = props => {
    // TODO:
    return (
        <div>
            <div className={props.classes.div}>
                <img src={img} className={props.classes.img} />
            </div>
            <Typography
                variant="h6"
                color="inherit"
                style={{ flexGrow: 1 }}
                noWrap={true}
                align="center"
            >
                <br />
                {Str.AppName}
                <br />
                {Str.Copyright}
            </Typography>
        </div>
    );
};

export default withStyles(styles)(AboutComponent);
