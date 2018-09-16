'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { IJikkenActions, JikkenActions } from '../actions/JikkenAction';
import JikkenComponent, { IJikkenComponentProps } from '../components/JikkenComponent';
import { IJikkenState } from '../states/JikkenState';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IJikkenComponentProps {
    return { checked: appState.checkBoxState.checked };
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IJikkenComponentProps {
    return {
        onChange: (s: any) => dispatch(JikkenActions.updateState(s))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JikkenComponent);
