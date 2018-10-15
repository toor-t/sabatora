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
import ManageDataComponent, { IManageDataComponentProps } from '../components/ManageDataComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IManageDataComponentProps {
    // TODO:
    return { checked: appState.manageDataState.checked };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IManageDataComponentProps {
    // TODO:
    return {
        onChange: (e: any) => dispatch(ManageDataActions.updateValue(e.target.checked))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
