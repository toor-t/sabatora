/**
 * AppTopContainer
 */
'use strict';
import { connect } from 'react-redux';
// TODO:
import { AppTopActions } from '../actions/AppTopAction';
import AppTopComponent, {
    IAppTopComponentStateProps,
    IAppTopComponentDispatchProps
} from '../components/AppTopComponent';
import { IAppState } from '../store';
import { CreateFormActions } from '../actions/CreateFormAction';
import {
    saveFormWorker,
    openFormWithConfirmWorker,
    newFormWithConfirmWorker,
    printFormWorker
} from '../states/CreateFormState';
// TODO: 実験用
import { ThunkDispatch } from 'redux-thunk';

function mapStateToProps(appState: IAppState) {
    // TODO:
    return {
        selectedIndex: appState.appTopState.selectedIndex,
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
        onSaveForm: () => dispatch(saveFormWorker()),
        onOpenForm: () => dispatch(openFormWithConfirmWorker()),
        onNewForm: () => dispatch(newFormWithConfirmWorker()),
        onPrintForm: () => dispatch(printFormWorker())
    };
}
export default connect<IAppTopComponentStateProps, IAppTopComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
