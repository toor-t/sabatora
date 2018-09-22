'use strict';
import * as ReactDataGrid from 'react-data-grid';
import * as React from 'react';
import { Toolbar, Editors } from 'react-data-grid-addons';
import immutabilityHelper from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor } = Editors;

let autoCompleteOptions: { id: number; title: string }[];
autoCompleteOptions = [];

// TODO:
const getAutoCompleteOptions = (): { id: number; title: string }[] => {
    return autoCompleteOptions;
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
        console.log('constructor called.');
    }
    render() {
        const { options, getOptions, ...rest } = this.props;
        console.log(`render called.`);
        console.log(this.props);
        return <AutoCompleteEditor options={getOptions()} {...rest} />;
    }
}

export interface ICreateFormDataGridComponentProps {
    // TODO:
    rows?: {}[];
    onGridRowUpdate?: (e: any) => void;
    onSelectedCell?: (col: { rowIdx: number; idx: number }) => void;
    autoCompleteOptions?: { id: number; title: string }[];
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
                key: 'id',
                name: 'No.',
                width: 80
            },
            {
                key: 'level_1',
                name: '大分類',
                editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
                // editor: <AutoCompleteEditor options={getAutoCompleteOptions()} />
            },
            {
                key: 'level_2',
                name: '中分類',
                editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
                // editor: <AutoCompleteEditor options={getAutoCompleteOptions()} />
            },
            {
                key: 'level_3',
                name: '小分類',
                editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
                // editor: <AutoCompleteEditor options={getAutoCompleteOptions()} />
            },
            {
                key: 'itemName',
                name: '名称',
                editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
                // editor: <AutoCompleteEditor options={getAutoCompleteOptions()} />
            },
            {
                key: 'unitPrice',
                name: '単価',
                editor: <MyAutoCompleteEditor getOptions={getAutoCompleteOptions} />
                // editor: <AutoCompleteEditor options={getAutoCompleteOptions()} />
            },
            {
                key: 'num',
                name: '個数',
                editable: true
            },
            {
                key: 'price',
                name: '価格',
                editable: false
            }
        ];

        this.state = {
            columns: _columns
        };

        this.rowGetter.bind(this);
        this.rowCount.bind(this);

        console.log('constructed.');
    }
    rowGetter = (i: number) => {
        return !this.props.rows ? [] : this.props.rows[i];
    };
    rowCount = () => {
        return !this.props.rows ? 0 : this.props.rows.length;
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
                    onCellSelected={this.props.onSelectedCell}
                    toolbar={
                        // tslint:disable-next-line:jsx-no-lambda
                        <Toolbar onAddRow={() => console.log('Add Row.')} enableFilter={true} />
                    }
                />
                <br />
            </div>
        );
    }
}

export default CreateFormDataGridComponent;
