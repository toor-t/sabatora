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
import AppTopComponent, { IAppTopComponentProps } from '../components/AppTopComponent';
import { IAppState } from '../store';

function mapStateToProps(appState: IAppState): IAppTopComponentProps {
    // TODO:
    return {
        selected: /* TODO */ 0,
        drawerOpend: appState.appTopState.drawerOpened
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): IAppTopComponentProps {
    // TODO:
    return {
        onOpenDrawer: () => dispatch(AppTopActions.openDrawer()),
        onCloseDrawer: () => dispatch(AppTopActions.closeDrawer())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTopComponent);
