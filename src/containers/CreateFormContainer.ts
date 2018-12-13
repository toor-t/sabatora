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
import { updateAutoCompleteOptionsWorker, FormDataRow } from '../states/CreateFormState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

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
        // printing: true,
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
// /**
//  * mergeProps
//  * @param stateProps
//  * @param dispatchProps
//  * @param ownProps
//  */
// function mergeProps(
// 	stateProps: ICreateFormComponentStateProps & INotifyComponentStateProps,
// 	dispatchProps: any,
// 	ownProps: any
// ): ICreateFormComponentStateProps &
// 	INotifyComponentStateProps &
// 	ICreateFormComponentDispatchProps &
// 	INotifyComponentDispatchProps {
// 	const { dispatch } = dispatchProps;

// 	return {
// 		// TODO:
// 		dispatch,

// 		// State Props
// 		...stateProps,

// 		// Dispatch Props
// 		onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
// 		onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
// 		updateAutoCompleteOptions: (c: any) => dispatch(updateAutoCompleteOptionsWorker(c)),
// 		addRow: () => dispatch(CreateFormActions.addRow()),
// 		deleteRows: () => dispatch(CreateFormActions.deleteRows()),
// 		selectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
// 			dispatch(CreateFormActions.selectRows(rows)),
// 		deselectRows: (rows: { rowIdx: number; row: FormDataRow }[]) =>
// 			dispatch(CreateFormActions.deselectRows(rows)),
// 		addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow()),
// 		startEdittingTitle: () => dispatch(CreateFormActions.startEdittingTitle()),
// 		endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title)),

// 		// Own Props
// 		...ownProps
// 	};
// }
/**
 * connect
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
