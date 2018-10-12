// TODO: AppTop画面コンテナ
//
// AppTopContainer
//
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

function mapStateToProps(appState: IAppState) {
    // TODO:
    return {
        selected: appState.appTopState.selected,
        drawerOpend: appState.appTopState.drawerOpened
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
    // TODO:
    return {
        onOpenDrawer: () => dispatch(AppTopActions.openDrawer()),
        onCloseDrawer: () => dispatch(AppTopActions.closeDrawer()),
        onSelectCreateForm: () => dispatch(AppTopActions.selectCreateForm()),
        onSelectManageData: () => dispatch(AppTopActions.selectManageData()),
        onSelectConfig: () => dispatch(AppTopActions.selectConfig()),
        onSelectAbout: () => dispatch(AppTopActions.selectAbout()),
        // TODO: 実験中
        onSaveForm: () => saveFormWorker(dispatch, void {}),
        onOpenForm: () => openFormWorker(dispatch, void {}),
        onPrintForm: () => dispatch(CreateFormActions.printForm())
    };
}
export default connect<IAppTopComponentStateProps, IAppTopComponentDispatchProps, {}, IAppState>(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
