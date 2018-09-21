// TODO: 帳票作成画面コンポーネンt
'use strict';
import * as React from 'react';
import CreateFormDataGridComponent from './CreateFormDataGridComponent';

export interface ICreateFormComponentProps {
    // TODO:
    title?: string;
    totalPrice?: number;

    // and so on
}

const CreateFormComponent: React.SFC<ICreateFormComponentProps> = props => {
    // TODO:
    const { title, totalPrice } = props;
    return (
        <div>
            <h1>{title}</h1>
            <br />
            <CreateFormDataGridComponent />
            <br />
            <div>合計: {totalPrice} 円</div>
        </div>
    );
};

export default CreateFormComponent;
