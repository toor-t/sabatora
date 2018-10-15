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
import { queryDbWorker } from '../states/ManageDataState';
import { DataDoc } from '../db';

function mapStateToProps(appState: IAppState): IManageDataComponentStateProps {
    // TODO:
    return {
        rows: appState.manageDataState.dbDataRows
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IManageDataComponentDispatchProps {
    // TODO:
    return {
        queryDb: () => queryDbWorker(dispatch, { query: <DataDoc>{}, projection: [] })
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
