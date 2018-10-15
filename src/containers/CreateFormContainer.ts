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
import { updateAutoCompleteOptionsWorker } from '../states/CreateFormState';

function mapStateToProps(
    appState: IAppState
): ICreateFormComponentStateProps & INotifyComponentStateProps {
    // TODO:
    return {
        title: appState.createFormState.formData.title,
        rows: appState.createFormState.formData.dataRows,
        autoCompleteOptions: appState.createFormState.autoCompleteOptions,
        edittingTitle: appState.createFormState.edittingTitle,
        notifyContext: appState.createFormState.notify
    };
}
function mapDispatchToProps(
    dispatch: Dispatch<Action<any>>
): ICreateFormComponentDispatchProps & INotifyComponentDispatchProps {
    // TODO:
    return {
        onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: any) => updateAutoCompleteOptionsWorker(dispatch, c),
        addRow: () => dispatch(CreateFormActions.addRow()),
        deleteRows: () => dispatch(CreateFormActions.deleteRows()),
        selectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.selectRows(rows)),
        deselectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.deselectRows(rows)),
        addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow()),
        startEdittingTitle: () => dispatch(CreateFormActions.startEdittingTitle()),
        endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title)),
        // TODO:
        onNotificationClose: () => dispatch(CreateFormActions.closeNotify()),
        onCloseButtonClick: () => dispatch(CreateFormActions.clickNotifyCloseButton())
    };
}
export default connect<
    ICreateFormComponentStateProps & INotifyComponentStateProps,
    ICreateFormComponentDispatchProps & INotifyComponentDispatchProps,
    {},
    IAppState
>(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
