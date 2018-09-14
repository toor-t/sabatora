import * as React from 'react';
import { ITextForm2Actions } from '../actions/TextForm2Action';
import { ITextForm2State } from '../states/TextForm2State';

type Props = ITextForm2State & ITextForm2Actions;

export const TextForm2Component: React.SFC<Props> = props => {
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
            <h1>{props.value}</h1> <br />
        </div>
    );
};
