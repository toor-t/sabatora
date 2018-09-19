'use strict';
import * as React from 'react';

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
            <input type="checkbox" checked={checked} onChange={onChange} /> <br />
        </div>
    );
};

export default AboutComponent;
