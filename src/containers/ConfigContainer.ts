// TODO: 設定画面コンテナ　現時点では必要性不明
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { CheckBoxActions } from '../actions/__CheckBoxAction';

import ConfigComponent, { IConfigComponentProps } from '../components/ConfigComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IConfigComponentProps {
    // TODO:
    return { checked: appState.checkBoxState.checked };
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IConfigComponentProps {
    // TODO:
    return {
        onChange: (e: any) => dispatch(CheckBoxActions.updateValue(e.target.checked))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigComponent);
