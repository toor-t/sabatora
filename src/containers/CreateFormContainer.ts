/**
 * CreateFormContainer
 */

import { connect } from 'react-redux';
import { CreateFormActions } from '../actions/CreateFormAction';
import CreateFormComponent, {
    CreateFormComponentStateProps,
    CreateFormComponentDispatchProps
} from '../components/CreateFormComponent';
import {
    NotifyComponentStateProps,
    NotifyComponentDispatchProps
} from '../components/NotifyComponent';

import { AppState } from '../store';
import { updateAutoCompleteOptionsWorker, FormDataRow, NormalRow } from '../states/CreateFormState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import * as ReactDataGrid from 'react-data-grid';
import { DataDoc } from '../db';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps({
    createFormState
}: AppState): CreateFormComponentStateProps & NotifyComponentStateProps {
    // TODO:
    return {
        title: createFormState.formData.title,
        rows: createFormState.formData.dataRows,
        autoCompleteOptions: createFormState.autoCompleteOptions,
        edittingTitle: createFormState.edittingTitle,
        notifyContext: createFormState.notify,
        selectedRowsCount: createFormState.formDataSelectedRowsCount,
        firstSelectedRowIdx: createFormState.formDataFirstSelectedRowIdx,
        formDataEditted: createFormState.formDataEditted,
        // TODO:
        printing: createFormState.printing
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<AppState, undefined, Action>
): CreateFormComponentDispatchProps & NotifyComponentDispatchProps {
    // TODO:
    return {
        dispatch, // NotifyComponent に dispatchを渡す必要があるため。

        onSelectedCell: (col: { rowIdx: number; idx: number }) =>
            dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: ReactDataGrid.GridRowsUpdatedEvent) =>
            dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: { rowData: NormalRow; columnDDKey?: keyof DataDoc }) =>
            dispatch(updateAutoCompleteOptionsWorker(c)),
        addRow: () => dispatch(CreateFormActions.addRow()),
        deleteRows: () => dispatch(CreateFormActions.deleteRows()),
        selectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
            dispatch(CreateFormActions.selectRows(rows)),
        deselectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
            dispatch(CreateFormActions.deselectRows(rows)),
        addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow()),
        startEdittingTitle: () => dispatch(CreateFormActions.startEdittingTitle()),
        endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title))
    };
}
/**
 * connect
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
