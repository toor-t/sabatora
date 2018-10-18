/**
 * CreateFormContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
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
import { updateAutoCompleteOptionsWorker, FormDataRow } from '../states/CreateFormState';

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
        printing: false
        // printing: true,
    };
}
function mapDispatchToProps(
    dispatch: any /*Dispatch<Action<any>>*/
): ICreateFormComponentDispatchProps & INotifyComponentDispatchProps {
    // TODO:
    return {
        onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: any) => dispatch(updateAutoCompleteOptionsWorker(c)),
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
// TODO:実験
function mergeProps(
    stateProps: ICreateFormComponentStateProps & INotifyComponentStateProps,
    dispatchProps: any,
    ownProps: any
): ICreateFormComponentStateProps &
    INotifyComponentStateProps &
    ICreateFormComponentDispatchProps &
    INotifyComponentDispatchProps {
    const { dispatch } = dispatchProps;
    const { formDataEditted } = stateProps;

    return {
        // TODO: 実験中
        dispatch,

        // State Props
        ...stateProps,

        // Dispatch Props
        onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: any) => dispatch(updateAutoCompleteOptionsWorker(c)),
        addRow: () => dispatch(CreateFormActions.addRow()),
        deleteRows: () => dispatch(CreateFormActions.deleteRows()),
        selectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
            dispatch(CreateFormActions.selectRows(rows)),
        deselectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
            dispatch(CreateFormActions.deselectRows(rows)),
        addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow()),
        startEdittingTitle: () => dispatch(CreateFormActions.startEdittingTitle()),
        endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title)),

        // Own Props
        ...ownProps
    };
}
export default connect<
    ICreateFormComponentStateProps & INotifyComponentStateProps,
    {},
    {},
    ICreateFormComponentStateProps &
        INotifyComponentStateProps &
        ICreateFormComponentDispatchProps &
        INotifyComponentDispatchProps,
    IAppState
>(
    mapStateToProps,
    // mapDispatchToProps,
    null,
    mergeProps
)(CreateFormComponent);
