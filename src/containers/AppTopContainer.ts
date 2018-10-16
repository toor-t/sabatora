/**
 * AppTopContainer
 */
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
// TODO:
import { AppTopActions } from '../actions/AppTopAction';
import AppTopComponent, {
    IAppTopComponentStateProps,
    IAppTopComponentDispatchProps
} from '../components/AppTopComponent';
import { IAppState } from '../store';
// TODO: 実験中
import { CreateFormActions } from '../actions/CreateFormAction';
import { openFormWorker, saveFormWorker } from '../states/CreateFormState';
import { queryDbWorker } from '../states/ManageDataState';
import { DataDoc } from '../db';

function mapStateToProps(appState: IAppState) {
    // TODO:
    return {
        selected: appState.appTopState.selected,
        drawerOpend: appState.appTopState.drawerOpened
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IAppTopComponentDispatchProps {
    // TODO:
    return {
        onOpenDrawer: () => dispatch(AppTopActions.openDrawer()),
        onCloseDrawer: () => dispatch(AppTopActions.closeDrawer()),
        onSelectMenuItem: (selected: number) => dispatch(AppTopActions.selectMenuItem(selected)),
        // TODO: 実験中
        onSaveForm: () => saveFormWorker(dispatch, void {}),
        onOpenForm: () => openFormWorker(dispatch, void {}),
        onNewForm: () => dispatch(CreateFormActions.newForm(false)),
        onPrintForm: () => dispatch(CreateFormActions.printForm()),
        // TODO: 実験用
        queryDb: () => queryDbWorker(dispatch, { query: <DataDoc>{}, projection: [] })
    };
}
export default connect<IAppTopComponentStateProps, IAppTopComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
