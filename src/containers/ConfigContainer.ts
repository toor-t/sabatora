// TODO: 設定画面コンテナ　現時点では必要性不明
/**
 * ConfigContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { ConfigActions } from '../actions/ConfigAction';
import ConfigComponent, { IConfigComponentProps } from '../components/ConfigComponent';
import { IAppState } from '../store';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(appState: IAppState): IConfigComponentProps {
    // TODO:
    return { checked: appState.configState.checked };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IConfigComponentProps {
    // TODO:
    return {
        onChange: (e: any) => dispatch(ConfigActions.updateValue(e.target.checked))
    };
}
/**
 * connect
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigComponent);
