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
 *  IAboutComponentStateProps
 */
export interface IAboutComponentStateProps {
    // TODO:
    // checked?: boolean;
}
/**
 * IAboutComponentDispatchProps
 */
export interface IAboutComponentDispatchProps {
    // onChange?: (e: any) => any;
}
/**
 * AboutComponent
 * @param props
 */
const AboutComponent: React.SFC<
    IAboutComponentStateProps & IAboutComponentDispatchProps & WithStyles<typeof styles>
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
