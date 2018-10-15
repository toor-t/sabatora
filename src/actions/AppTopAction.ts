/**
 * AppTopAction
 */
'use strict';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('APP_TOP_ACTIONS');

/**
 * AppTopActions
 */
export const AppTopActions = {
    /**
     * ドロワーを開く
     */
    openDrawer: actionCreator<void>('OPEN_DRAWER'),
    /**
     * ドロワーを閉じる
     */
    closeDrawer: actionCreator<void>('CLOSE_DRAWER'),
    /**
     * 帳票作成選択
     */
    selectCreateForm: actionCreator<void>('SELECT_CREATE_FORM'),
    /**
     * データ管理選択
     */
    selectManageData: actionCreator<void>('SELECT_MANAGE_DATA'),
    /**
     * 設定選択
     */
    selectConfig: actionCreator<void>('SELECT_CONFIG'),
    /**
     * About選択
     */
    selectAbout: actionCreator<void>('SELECT_ABOUT')
};
