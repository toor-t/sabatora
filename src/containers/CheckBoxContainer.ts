'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ICheckBoxActions, CheckBoxActions } from '../actions/CheckBoxAction';
import CheckBoxComponent, { ICheckBoxComponentProps } from '../components/CheckBoxComponent';
import { ICheckBoxState } from '../states/CheckBoxState';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ICheckBoxComponentProps {
    return { checked: appState.checkBoxState.checked };
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ICheckBoxComponentProps {
    return {
        onChange: (e: any) => dispatch(CheckBoxActions.updateValue(e.target.checked))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckBoxComponent);
