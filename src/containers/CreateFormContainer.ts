/**
 * CreateFormContainer
 */
'use strict';
import { connect } from 'react-redux';
import { CreateFormActions } from '../actions/CreateFormAction';
import CreateFormComponent, {
    ICreateFormComponentStateProps,
    ICreateFormComponentDispatchProps
} from '../components/CreateFormComponent';
import {
    INotifyComponentStateProps,
    INotifyComponentDispatchProps
} from '../components/NotifyComponent';

import { IAppState } from '../store';
import { updateAutoCompleteOptionsWorker, FormDataRow, NormalRow } from '../states/CreateFormState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import * as ReactDataGrid from 'react-data-grid';
import {
    ICreateFormDataGridComponentStateProps,
    ICreateFormDataGridComponentDispatchProps
} from '../components/CreateFormDataGridComponent';
import { DataDoc } from '../db';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(
    appState: IAppState
): ICreateFormComponentStateProps & INotifyComponentStateProps {
    // TODO:
    return {
        title: appState.createFormState.formData.title,
        rows: appState.createFormState.formData.dataRows,
        autoCompleteOptions: appState.createFormState.autoCompleteOptions,
        edittingTitle: appState.createFormState.edittingTitle,
        notifyContext: appState.createFormState.notify,
        selectedRowsCount: appState.createFormState.formDataSelectedRowsCount,
        firstSelectedRowIdx: appState.createFormState.formDataFirstSelectedRowIdx,
        formDataEditted: appState.createFormState.formDataEditted,
        // TODO:
        printing: appState.createFormState.printing
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<IAppState, undefined, Action>
): ICreateFormComponentDispatchProps & INotifyComponentDispatchProps {
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
export default connect<
    ICreateFormComponentStateProps & ICreateFormDataGridComponentStateProps,
    ICreateFormComponentDispatchProps & ICreateFormDataGridComponentDispatchProps,
    {},
    IAppState
>(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
