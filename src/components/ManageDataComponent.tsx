// TODO: データ管理画面コンポーネント
'use strict';
import * as React from 'react';

export interface IManageDataComponentProps {
    // TODO:
    checked?: boolean;
    onChange?: (e: any) => any;
}

const ManageDataComponent: React.SFC<IManageDataComponentProps> = props => {
    // TODO:
    const { checked, onChange } = props;
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} /> <br />
        </div>
    );
};

export default ManageDataComponent;
