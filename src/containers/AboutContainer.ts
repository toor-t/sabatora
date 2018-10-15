/**
 * AboutContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { AboutActions } from '../actions/AboutAction';
import AboutComponent, { IAboutComponentProps } from '../components/AboutComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IAboutComponentProps {
    // TODO:
    return { checked: appState.aboutState.checked };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IAboutComponentProps {
    // TODO:
    return {
        onChange: (e: any) => dispatch(AboutActions.updateValue(e.target.checked))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent);
