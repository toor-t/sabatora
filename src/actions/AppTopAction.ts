/**
 * AppTopAction
 */
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
     * ドロワーメニュー項目選択
     */
    selectMenuItem: actionCreator<number>('SELECT_MENU_ITEM')
};
