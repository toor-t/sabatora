// TODO: 帳票作成画面コンテナ
//
// CreateFormContainer
//
'use strict';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CreateFormActions } from '../actions/CreateFormAction';
import CreateFormComponent, {
    ICreateFormComponentStateProps,
    ICreateFormComponentDispatchProps
} from '../components/CreateFormComponent';
import { IAppState } from '../store';
// TODO:
import { FormDataRow } from '../states/CreateFormState';
import wrapAsyncWorker from '../wrapAsyncWorker';
import { updateAutoCompleteOptions } from '../db_renderer';
// TODO: ファイル入出力
import { remote } from 'electron';
import * as fs from 'fs';
const dialog = remote.dialog;

// TODO: 非同期でautoCompleteOptionsを更新する  ※これここに置くべきか？
export const updateAutoCompleteOptionsWorker = wrapAsyncWorker<
    { rowData: FormDataRow; columnDDKey: string },
    {},
    {}
>(
    CreateFormActions.updateAutoCompleteOptions,
    ({ rowData, columnDDKey }): Promise<{}> => {
        // console.log(columnDDKey);
        const _rowData = Object.assign({}, rowData, { [columnDDKey]: undefined });
        // console.log(_rowData);
        return updateAutoCompleteOptions(_rowData);
    }
);
// TODO: 非同期帳票読込
export const openFormWorker = wrapAsyncWorker<void, Buffer, {}>(
    CreateFormActions.openForm,
    (): Promise<Buffer> => {
        // TODO: 実験中
        return new Promise((resolve, reject) => {
            // ファイル読込ダイアログを表示する
            dialog.showOpenDialog(
                remote.getCurrentWindow(),
                {
                    title: '帳票読込',
                    filters: [
                        { name: 'JSON File', extensions: ['json'] }, // TODO: 拡張子は仮
                        { name: 'All Files', extensions: ['*'] }
                    ]
                },
                filename => {
                    if (filename[0]) {
                        console.log(filename[0]);
                        // ファイルオープン
                        const data = fs.readFileSync(filename[0]); // TODO: 例外処理とか必要のはず
                        resolve(data);
                    }
                }
            );
        });
    }
);

function mapStateToProps(appState: IAppState): ICreateFormComponentStateProps {
    // TODO:
    return {
        title: appState.createFormState.title,
        rows: appState.createFormState.dataRows,
        autoCompleteOptions: appState.createFormState.autoCompleteOptions,
        edittingTitle: appState.createFormState.edittingTitle
    };
}
function mapDispatchToProps(dispatch: Dispatch<Action<any>>): ICreateFormComponentDispatchProps {
    // TODO:
    return {
        onSelectedCell: (col: any) => dispatch(CreateFormActions.selectCell(col)),
        onGridRowUpdate: (e: any) => dispatch(CreateFormActions.updateGridRow(e)),
        updateAutoCompleteOptions: (c: any) => updateAutoCompleteOptionsWorker(dispatch, c),
        addRow: () => dispatch(CreateFormActions.addRow()),
        deleteRows: () => dispatch(CreateFormActions.deleteRows()),
        selectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.selectRows(rows)),
        deselectRows: (rows: { rowIdx: number; row: FormData }[]) =>
            dispatch(CreateFormActions.deselectRows(rows)),
        addSubtotalRow: () => dispatch(CreateFormActions.addSubtotalRow()),
        startEdittingTitle: () => dispatch(CreateFormActions.startEdittingTitle()),
        endEdittingTitle: (title: string) => dispatch(CreateFormActions.endEdittingTitle(title))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFormComponent);
