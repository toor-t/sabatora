// TODO: データ管理画面コンテナ
/**
 * ManageDataContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Action } from 'redux';
// TODO:
import { ManageDataActions } from '../actions/ManageDataAction';
import ManageDataComponent, {
    IManageDataComponentStateProps,
    IManageDataComponentDispatchProps
} from '../components/ManageDataComponent';
import { IAppState } from '../store';
import { queryDbWorker, DBDataRow } from '../states/ManageDataState';
import { DataDoc } from '../db';
import { ThunkDispatch } from 'redux-thunk';
import * as ReactDataGrid from 'react-data-grid';

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
    dispatch: ThunkDispatch<IAppState, undefined, Action>
): IManageDataComponentDispatchProps {
    // TODO:
    return {
        queryDb: () => dispatch(queryDbWorker({ query: <DataDoc>{}, projection: [] })),
        onGridRowUpdate: (e: ReactDataGrid.GridRowsUpdatedEvent) =>
            dispatch(ManageDataActions.updateGridRow(e)),
        addRow: () => dispatch(ManageDataActions.addRow()),
        deleteRows: () => dispatch(ManageDataActions.deleteRows()),
        selectRows: (
            rows: {
                rowIdx: number;
                row: DBDataRow;
            }[]
        ) => dispatch(ManageDataActions.selectRows(rows)),
        deselectRows: (
            rows: {
                rowIdx: number;
                row: DBDataRow;
            }[]
        ) => dispatch(ManageDataActions.deselectRows(rows))
    };
}
/**
 * connect
 */
export default connect<
    IManageDataComponentStateProps,
    IManageDataComponentDispatchProps,
    {},
    IAppState
>(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
