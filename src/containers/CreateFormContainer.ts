// TODO: 帳票作成画面コンテナ
//
// CreateFormContainer
//
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CreateFormActions } from '../actions/CreateFormAction';
import CreateFormComponent, { ICreateFormComponentProps } from '../components/CreateFormComponent';
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

function mapStateToProps(appState: IAppState): ICreateFormComponentProps {
    // TODO:
    return {
        title: appState.createFormState.title,
        totalPrice: appState.createFormState.totalPrice,
        rows: appState.createFormState.dataRows,
        autoCompleteOptions: appState.createFormState.autoCompleteOptions
    };
}
function mapDispatchToProps(
    dispatch: Dispatch<Action<any>>,
    props: ICreateFormComponentProps
): ICreateFormComponentProps {
    // TODO:
    return {
        ...props,
        onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: any) => updateAutoCompleteOptionsWorker(dispatch, c),
        addRow: () => dispatch(CreateFormActions.addRow()),
        deleteRows: () => dispatch(CreateFormActions.deleteRows()),
        selectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.selectRows(rows)),
        deselectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.deselectRows(rows)),
        addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
