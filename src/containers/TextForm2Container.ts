import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { ITextForm2Actions, textForm2Actions } from '../actions/TextForm2Action';
import { textForm2Component } from '../components/TextForm2Component';
import { ITextForm2State } from '../states/TextForm2State';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): ITextForm2State {
    return Object.assign({}, appState.textForm2State);
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ITextForm2Actions {
    return {
        updateValue: (v: string) => dispatch(textForm2Actions.updateValue(v))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(textForm2Component);
