import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ITextFormActions, TextFormActions } from '../actions/TextFormAction';
import TextFormComponent, { ITextFormComponentProps } from '../components/TextFormComponent';
import { ITextFormState } from '../states/TextFormState';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ITextFormComponentProps {
    return Object.assign({}, appState.textFormState);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ITextFormComponentProps {
    return {
        onChange: (e: any) => dispatch(TextFormActions.updateValue(e.target.value))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextFormComponent);
