// TODO: データ管理画面コンテナ
/**
 * ManageDataContainer
 */

import { connect } from 'react-redux';
import { Action } from 'redux';
// TODO:
import { ManageDataActions } from '../actions/ManageDataAction';
import ManageDataComponent, {
    ManageDataComponentStateProps,
    ManageDataComponentDispatchProps
} from '../components/ManageDataComponent';
import { AppState } from '../store';
import { queryDbWorker, DBDataRow } from '../states/ManageDataState';
import { DataDoc } from '../db';
import { ThunkDispatch } from 'redux-thunk';
import * as ReactDataGrid from 'react-data-grid';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps({ manageDataState }: AppState): ManageDataComponentStateProps {
    // TODO:
    return {
        rows: manageDataState.dbDataRows,
        selectedRowsCount: manageDataState.selectedRowsCount
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<AppState, undefined, Action>
): ManageDataComponentDispatchProps {
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageDataComponent);
