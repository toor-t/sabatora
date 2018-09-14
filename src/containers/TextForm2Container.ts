import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ITextForm2Actions, TextForm2Actions } from '../actions/TextForm2Action';
import { TextForm2Component } from '../components/TextForm2Component';
import { ITextForm2State } from '../states/TextForm2State';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ITextForm2State {
    return Object.assign({}, appState.textForm2State);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ITextForm2Actions {
    return {
        updateValue: (v: string) => dispatch(TextForm2Actions.updateValue(v))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextForm2Component);
