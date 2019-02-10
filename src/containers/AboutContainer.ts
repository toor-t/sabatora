/**
 * AboutContainer
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO:
import { AboutActions } from '../actions/AboutAction';
import AboutComponent, {
    AboutComponentStateProps,
    AboutComponentDispatchProps
} from '../components/AboutComponent';
import { AppState } from '../store';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps({ aboutState }: AppState): AboutComponentStateProps {
    // TODO:
    return {
        // checked: appState.aboutState.checked
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): AboutComponentDispatchProps {
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
