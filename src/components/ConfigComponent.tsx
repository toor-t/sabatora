'use strict';
import * as React from 'react';

export interface IConfigComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}

const ConfigComponent: React.SFC<IConfigComponentProps> = props => {
    // TODO:
    const { checked, onChange } = props;
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} /> <br />
        </div>
    );
};

export default ConfigComponent;
