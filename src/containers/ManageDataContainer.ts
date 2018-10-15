// TODO: データ管理画面コンテナ
/**
 * ManageDataContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { ManageDataActions } from '../actions/ManageDataAction';
import ManageDataComponent, {
    IManageDataComponentStateProps,
    IManageDataComponentDispatchProps
} from '../components/ManageDataComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IManageDataComponentStateProps {
    // TODO:
    return {};
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IManageDataComponentDispatchProps {
    // TODO:
    return {};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
