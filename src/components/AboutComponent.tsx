/**
 * AboutComponent
 */
'use strict';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';

export interface IAboutComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}

const AboutComponent: React.SFC<IAboutComponentProps> = props => {
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
                About
            </Typography>
        </div>
    );
};

export default AboutComponent;
