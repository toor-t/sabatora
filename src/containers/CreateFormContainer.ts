// TODO: 帳票作成画面コンテナ
//
// CreateFormContainer
//
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CreateFormActions } from '../actions/CreateFormAction';
import CreateFormComponent, {
    ICreateFormComponentStateProps,
    ICreateFormComponentDispatchProps
} from '../components/CreateFormComponent';
import { IAppState } from '../store';
// TODO:
import { FormDataRow } from '../states/CreateFormState';
import wrapAsyncWorker from '../wrapAsyncWorker';
import { updateAutoCompleteOptions } from '../db_renderer';

// TODO: 非同期でautoCompleteOptionsを更新する  ※これここに置くべきか？
export const updateAutoCompleteOptionsWorker = wrapAsyncWorker<
    { rowData: FormDataRow; idx: number },
    {},
    {}
>(
    CreateFormActions.updateAutoCompleteOptions,
    ({ rowData, idx }): Promise<{}> => {
        return updateAutoCompleteOptions(rowData);
    }
);

function mapStateToProps(appState: IAppState): ICreateFormComponentStateProps {
    // TODO:
    return {
        title: appState.createFormState.title,
        rows: appState.createFormState.dataRows,
        autoCompleteOptions: appState.createFormState.autoCompleteOptions,
        edittingTitle: appState.createFormState.edittingTitle
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ICreateFormComponentDispatchProps {
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
        endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
