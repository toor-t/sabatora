'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CheckBoxActions } from '../actions/__CheckBoxAction';
import __CheckBoxComponent, { ICheckBoxComponentProps } from '../components/__CheckBoxComponent';
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
)(__CheckBoxComponent);
