// TODO: 帳票作成画面コンポーネンt
'use strict';
import * as React from 'react';

export interface ICreateFormComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}

const CreateFormComponent: React.SFC<ICreateFormComponentProps> = props => {
    // TODO:
    const { checked, onChange } = props;
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} /> <br />
        </div>
    );
};

export default CreateFormComponent;
