import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CheckBoxComponent } from '../components/CheckBoxComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckBoxComponent);
