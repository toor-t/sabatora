//
// CreateFormComponent
//
'use strict';

import * as React from 'react';
import CreateFormDataGridComponent, {
    ICreateFormDataGridComponentProps
} from './CreateFormDataGridComponent';

// CreateFormComponent
export interface ICreateFormComponentProps extends ICreateFormDataGridComponentProps {
    // TODO:
    title?: string;
    totalPrice?: number;

    // and so on
}
const CreateFormComponent: React.SFC<ICreateFormComponentProps> = props => {
    // TODO:
    const { title, totalPrice, ...rest } = props;

    return (
        <div>
            <h1>{title}</h1>
            <br />
            <CreateFormDataGridComponent {...rest} />
            <br />
            <div>合計: {totalPrice} 円</div>
        </div>
    );
};

export default CreateFormComponent;
