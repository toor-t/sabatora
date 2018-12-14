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
import {
    saveFormWorker,
    openFormWithConfirmWorker,
    newFormWithConfirmWorker,
    printFormWorker
} from '../states/CreateFormState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

/**
 * mapStateToProps
 * @param appState
 */
function mapStateToProps(appState: IAppState) {
    // TODO:
    return {
        selectedIndex: appState.appTopState.selectedIndex,
        drawerOpend: appState.appTopState.drawerOpened
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<IAppState, undefined, Action>
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
/**
 * connect
 */
export default connect<IAppTopComponentStateProps, IAppTopComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
