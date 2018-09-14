import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ITextFormActions, textFormActions } from '../actions/TextFormAction';
import { textFormComponent } from '../components/TextFormComponent';
import { ITextFormState } from '../states/TextFormState';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ITextFormState {
    return Object.assign({}, appState.textFormState);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ITextFormActions {
    return {
        updateValue: (v: string) => dispatch(textFormActions.updateValue(v))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(textFormComponent);
