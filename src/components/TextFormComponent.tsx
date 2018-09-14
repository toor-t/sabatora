import * as React from 'react';
import { ITextFormActions } from '../actions/TextFormAction';
import { ITextFormState } from '../states/TextFormState';

type Props = ITextFormState & ITextFormActions;

export const textFormComponent: React.SFC<Props> = (props: Props) => {
    return (
        <div>
            <input
                type="text"
                placeholder="value"
                value={props.value}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={(e: any) => props.updateValue(e.target.value)}
            />
            <br />
            <h1>{props.value}</h1>
            <br />
        </div>
    );
};
