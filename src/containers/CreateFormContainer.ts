// TODO: 帳票作成画面コンテナ
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { CreateFormActions } from '../actions/CreateFormAction';

import CreateFormComponent, { ICreateFormComponentProps } from '../components/CreateFormComponent';
import { IAppState } from '../store';
import { updateAutoCompleteOptionsWorker } from '../states/CreateFormState';

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
        addRow: () => dispatch(CreateFormActions.addRow())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
