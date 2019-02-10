/**
 * AppTopContainer
 */

import { connect } from 'react-redux';
// TODO:
import { AppTopActions } from '../actions/AppTopAction';
import AppTopComponent, {
    AppTopComponentStateProps,
    AppTopComponentDispatchProps
} from '../components/AppTopComponent';
import { AppState } from '../store';
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
function mapStateToProps({ appTopState }: AppState): AppTopComponentStateProps {
    // TODO:
    return {
        selectedIndex: appTopState.selectedIndex,
        drawerOpend: appTopState.drawerOpened
    };
}
/**
 * mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(
    dispatch: ThunkDispatch<AppState, undefined, Action>
): AppTopComponentDispatchProps {
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
