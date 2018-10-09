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

function mapStateToProps(appState: IAppState): IAppTopComponentStateProps {
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
        onSelectCreateForm: () => dispatch(AppTopActions.selectCreateForm()),
        onSelectManageData: () => dispatch(AppTopActions.selectManageData()),
        onSelectConfig: () => dispatch(AppTopActions.selectConfig()),
        onSelectAbout: () => dispatch(AppTopActions.selectAbout())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
