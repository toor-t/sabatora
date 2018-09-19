'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { TextFormActions } from '../actions/__TextFormAction';
import __TextFormComponent, { ITextFormComponentProps } from '../components/__TextFormComponent';
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
)(__TextFormComponent);
