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

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(appState: IAppState): IManageDataComponentStateProps {
    // TODO:
    return {
        rows: appState.manageDataState.dbDataRows,
        selectedRowsCount: appState.manageDataState.selectedRowsCount
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<IAppState, undefined, Action<any>>
): IManageDataComponentDispatchProps {
    // TODO:
    return {
        queryDb: () => dispatch(queryDbWorker({ query: <DataDoc>{}, projection: [] })),
        onGridRowUpdate: (e: any) => dispatch(ManageDataActions.updateGridRow(e)),
        addRow: () => dispatch(ManageDataActions.addRow()),
        deleteRows: () => dispatch(ManageDataActions.deleteRows()),
        selectRows: (rows: any) => dispatch(ManageDataActions.selectRows(rows)),
        deselectRows: (rows: any) => dispatch(ManageDataActions.deselectRows(rows))
    };
}
/**
 * connect
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
