import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ICheckBoxActions, CheckBoxActions } from '../actions/CheckBoxAction';
import { CheckBoxComponent } from '../components/CheckBoxComponent';
import { ICheckBoxState } from '../states/CheckBoxState';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ICheckBoxState {
    return Object.assign({}, appState.checkBoxState);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ICheckBoxActions {
    return {
        updateValue: (v: boolean) => dispatch(CheckBoxActions.updateValue(v))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckBoxComponent);
