// TODO: 設定画面コンテナ　現時点では必要性不明
/**
 * ConfigContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO:
import { ConfigActions } from '../actions/ConfigAction';
import ConfigComponent, {
    IConfigComponentStateProps,
    IConfigComponentDispatchProps
} from '../components/ConfigComponent';
import { IAppState } from '../store';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(appState: IAppState): IConfigComponentStateProps {
    // TODO:
    return {
        // checked: appState.configState.checked
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): IConfigComponentDispatchProps {
    // TODO:
    return {
        // onChange: (e: any) => dispatch(ConfigActions.updateValue(e.target.checked))
    };
}
/**
 * connect
 */
export default connect<IConfigComponentStateProps, IConfigComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(ConfigComponent);
