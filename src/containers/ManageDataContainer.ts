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
import { ThunkDispatch } from 'redux-thunk';

function mapStateToProps(appState: IAppState): IManageDataComponentStateProps {
    // TODO:
    return {
        rows: appState.manageDataState.dbDataRows
    };
}
function mapDispatchToProps(
    dispatch: ThunkDispatch<IAppState, {}, any>
): IManageDataComponentDispatchProps {
    // TODO:
    return {
        queryDb: () => dispatch(queryDbWorker({ query: <DataDoc>{}, projection: [] })),
        onGridRowUpdate: (e: any) => dispatch(ManageDataActions.updateGridRow(e)),
        addRow: () => dispatch(ManageDataActions.addRow()),
        deleteRows: () => dispatch(ManageDataActions.deleteRows())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
