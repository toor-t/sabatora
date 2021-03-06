/**
 * strings
 */

export namespace Str {
    export const AppName = 'sabatora.';
    export const Copyright = '(C) 2008 toor-t';

    export const No = 'No.';
    export const Level_1 = '大項目';
    export const Level_2 = '中項目';
    export const Level_3 = '小項目';
    export const ItemName = '名称';
    export const UnitPrice = '単価';
    export const Num = '個数';
    export const Price = '価格';
    export const SubtotalPrice = '小計';
    export const TotalPrice = '合計';
    export const InitialFormTitle = '新規帳票';

    export const Level_1_NewItem = '==新規大項目==';
    export const Level_2_NewItem = '==新規中項目==';
    export const Level_3_NewItem = '==新規小項目==';
    export const ItemName_NewItem = '==新規名称==';
}

export namespace Title {
    export const About = 'About';
    export const CreateForm = '帳票作成';
    export const ManageData = 'データ管理';
    export const Config = '設定';
}

export namespace MenuTitle {
    export const OpenForm = '帳票読込';
    export const SaveForm = '帳票保存';
    export const NewForm = '新規帳票';
    export const PrintForm = '帳票印刷';
}

export namespace BtnLabel {
    export const AddRow = '行追加';
    export const InsertRow = '行挿入';
    export const AddSubtotalRow = '小計行追加';
    export const InsertSubtotalRow = '小計行挿入';
    export const DeleteRows = '行削除';
    export const Cancel = 'キャンセル';
    export const Accept = '続行';
}

export namespace Message {
    export const ConfirmOpenForm =
        '現在の帳票は変更されています。保存せずに帳票読込を行いますか？（現在の帳票の変更内容は破棄されます)';
    export const ConfirmNewForm =
        '現在の帳票は変更されています。保存せずに新規帳票作成を行いますか？（現在の帳票の変更内容は破棄されます)';
    export const SaveFormDone = '帳票保存完了';
    export const SaveFormFailed = '帳票保存失敗';
    export const OpenFormDone = '帳票読込完了';
    export const OpenFormFailed = '帳票読込失敗';
}
