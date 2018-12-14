/**
 * AboutContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO:
import { AboutActions } from '../actions/AboutAction';
import AboutComponent, { IAboutComponentProps } from '../components/AboutComponent';
import { IAppState } from '../store';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(appState: IAppState): IAboutComponentProps {
    // TODO:
    return {
        // checked: appState.aboutState.checked
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): IAboutComponentProps {
    // TODO:
    return {
        // onChange: (e: any) => dispatch(AboutActions.updateValue(e.target.checked))
    };
}
/**
 * connect
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent);
