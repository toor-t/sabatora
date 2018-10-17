/**
 * AppTopContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO:
import { AppTopActions } from '../actions/AppTopAction';
import AppTopComponent, {
    IAppTopComponentStateProps,
    IAppTopComponentDispatchProps
} from '../components/AppTopComponent';
import { IAppState } from '../store';
import { CreateFormActions } from '../actions/CreateFormAction';
import {
    openFormWorker,
    saveFormWorker,
    openFormWithConfirm,
    newFormWithConfirm
} from '../states/CreateFormState';
import { queryDbWorker } from '../states/ManageDataState';
import { DataDoc } from '../db';
// TODO: 実験用
import { ThunkDispatch } from 'redux-thunk';

function mapStateToProps(appState: IAppState) {
    // TODO:
    return {
        selected: appState.appTopState.selected,
        drawerOpend: appState.appTopState.drawerOpened
    };
}
function mapDispatchToProps(
    dispatch: ThunkDispatch<IAppState, {}, any>
): IAppTopComponentDispatchProps {
    // TODO:
    return {
        onOpenDrawer: () => dispatch(AppTopActions.openDrawer()),
        onCloseDrawer: () => dispatch(AppTopActions.closeDrawer()),
        onSelectMenuItem: (selected: number) => dispatch(AppTopActions.selectMenuItem(selected)),
        onSaveForm: () => saveFormWorker(dispatch, void {}),
        onOpenForm: () => /*openFormWorker(dispatch, void {})*/ dispatch(openFormWithConfirm()), // TODO: 実験中
        onNewForm: () =>
            /*dispatch(CreateFormActions.newForm(false))*/ dispatch(newFormWithConfirm()), // TODO:  実験中
        onPrintForm: () => dispatch(CreateFormActions.printForm()),
        // TODO: 実験用
        queryDb: () => queryDbWorker(dispatch, { query: <DataDoc>{}, projection: [] })
    };
}
export default connect<IAppTopComponentStateProps, IAppTopComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
