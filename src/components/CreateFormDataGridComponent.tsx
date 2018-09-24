'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';
import { FormDataRow, FormDataRowKeys } from '../states/CreateFormState';
import { DataDocKeys } from '../db';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: any;
autoCompleteOptions = {};

// TODO:
// const getAutoCompleteOptions = (): { id: number; title: string }[] => {
// 	return autoCompleteOptions;
// };

const getOptions = (ddKey: string): { (): { id: number; title: string } } => {
    return () => {
        return autoCompleteOptions[ddKey];
    };
};

interface IMyAutoComleteEditorStates {
    // TODO:
}

class MyAutoCompleteEditor extends ReactDataGrid.editors.EditorBase<
    any,
    IMyAutoComleteEditorStates
> {
    constructor(props: any) {
        super(props);
        this.state = {
            // TODO:
        };
        this.getValue.bind(this);
        this.getInputNode.bind(this);
        this.hasResults.bind(this);
        // console.log('constructor called.');
    }
    // TODO:
    autoComplete: any;

    componentWillMount() {
        console.log(`componentWillMount() this=${this.toString()}`);
    }
    componentWillUnmount() {
        console.log(`componentWillUnmount() this=${this.toString()}`);
    }
    componentWillUpdate() {
        console.log(`componentWillUpdate() this=${this.toString()}`);
    }
    componentWillReceiveProps() {
        console.log(`componentWillReceiveProps() this=${this.toString()}`);
    }
    componentDidMount() {
        console.log(`componentDidMount() this=${this.toString()}`);
    }
    componentDidUpdate() {
        console.log(`componentDidUpdate() this=${this.toString()}`);
    }
    componentDidCatch() {
        console.log(`componentDidCatch() this=${this.toString()}`);
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any) {
        console.log(`shouldComponentUpdate(${nextProps.toString()},${nextState.toString()},${nextContext.toString()})
		 this=${this.toString()}`);
        return true;
    }
    getSnapshotBeforeUpdate() {
        console.log(`getSnapshotBeforeUpdate() this=${this.toString()}`);
    }
    getValue() {
        console.log('getValue() called!!');
        return this.autoComplete.getValue();
    }
    getInputNode() {
        console.log('getInputNode() called!!!');
        return this.autoComplete.getInputNode();
    }
    hasResults() {
        console.log('hasResults() called!!!');
        return this.autoComplete.hasResults();
    }
    render() {
        const { ref, options, getOptions, ...rest } = this.props;
        // console.log(`render called.`);
        // console.log(this.props);
        return (
            <AutoCompleteEditor
                ref={node => (this.autoComplete = node)}
                options={getOptions()}
                {...rest}
            />
        );
    }
}

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    // colmuns?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
    updateAutoCompleteOptions?: (col: { rowData: FormDataRow; idx: number }) => void;
    addRow?: () => void;
}

interface ICreateFormDataGridComponentStates {
    columns: any[];
}

class CreateFormDataGridComponent extends React.Component<
    ICreateFormDataGridComponentProps,
    ICreateFormDataGridComponentStates
> {
    constructor(props: ICreateFormDataGridComponentProps) {
        super(props);
        const _columns = [
            {
                key: FormDataRowKeys.id,
                name: 'No.',
                width: 64
            },
            {
                key: FormDataRowKeys.level_1,
                name: '大分類',
                ddKey: DataDocKeys.level_1,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_1)} />
            },
            {
                key: FormDataRowKeys.level_2,
                name: '中分類',
                ddKey: DataDocKeys.level_2,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_2)} />
            },
            {
                key: FormDataRowKeys.level_3,
                name: '小分類',
                ddKey: DataDocKeys.level_3,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.level_3)} />
            },
            {
                key: FormDataRowKeys.itemName,
                name: '名称',
                ddKey: DataDocKeys.itemName,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.itemName)} />
            },
            {
                key: FormDataRowKeys.unitPrice,
                name: '単価',
                ddKey: DataDocKeys.unitPrice,
                editor: <MyAutoCompleteEditor getOptions={getOptions(DataDocKeys.unitPrice)} />
            },
            {
                key: FormDataRowKeys.num,
                name: '個数',
                editable: true
            },
            {
                key: FormDataRowKeys.price,
                name: '価格',
                editable: false
            }
        ];

        this.state = {
            columns: _columns
        };

        this.rowGetter.bind(this);
        this.rowCount.bind(this);
        this.handleCellSeceted.bind(this);

        console.log('constructed.');
    }
    rowGetter = (i: number) => {
        return !this.props.rows ? [] : this.props.rows[i];
    };
    rowCount = () => {
        return !this.props.rows ? 0 : this.props.rows.length;
    };
    handleCellSeceted = (col: { rowIdx: number; idx: number }) => {
        // TODO:
        if (this.props.onSelectedCell) {
            this.props.onSelectedCell(col);
        }
        if (this.props.updateAutoCompleteOptions && this.props.rows) {
            this.props.updateAutoCompleteOptions({
                rowData: this.props.rows[col.rowIdx] as FormDataRow,
                idx: col.idx
            });
        }
    };
    render() {
        // TODO:
        if (this.props.autoCompleteOptions !== undefined) {
            autoCompleteOptions = this.props.autoCompleteOptions;
        }

        return (
            <div>
                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.rowCount()}
                    minHeight={500}
                    onGridRowsUpdated={this.props.onGridRowUpdate}
                    onCellSelected={this.handleCellSeceted}
                    toolbar={
                        // tslint:disable-next-line:jsx-no-lambda
                        <Toolbar onAddRow={this.props.addRow} enableFilter={true} />
                    }
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
