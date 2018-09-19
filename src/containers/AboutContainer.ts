// TODO: ABOUT画面コンテナ　現時点では必要性不明
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { CheckBoxActions } from '../actions/__CheckBoxAction';

import AboutComponent, { IAboutComponentProps } from '../components/AboutComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IAboutComponentProps {
    // TODO:
    return { checked: appState.checkBoxState.checked };
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IAboutComponentProps {
    // TODO:
    return {
        onChange: (e: any) => dispatch(CheckBoxActions.updateValue(e.target.checked))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent);
