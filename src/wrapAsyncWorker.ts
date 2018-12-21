// from https://gist.github.com/ttamminen/fa3a4030efbb85701d9fe58a039fe19d#file-wrapasyncworker-ts
import { AsyncActionCreators } from 'typescript-fsa';
import { Dispatch } from 'react';
import { Action } from 'redux';

// https://github.com/aikoven/typescript-fsa/issues/5#issuecomment-255347353
// export function wrapAsyncWorker<TParameters, TSuccess, TError>(
// 	asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
// 	worker: (params: TParameters) => Promise<TSuccess>
// ) {
// 	return async function wrappedWorker(
// 		dispatch: Dispatch<Action>,
// 		params: TParameters
// 	): Promise<TSuccess> {
// 		dispatch(asyncAction.started(params));
// 		return worker(params).then(
// 			result => {
// 				dispatch(asyncAction.done({ params, result }));
// 				return result;
// 			},
// 			(error: TError) => {
// 				dispatch(asyncAction.failed({ params, error }));
// 				throw error;
// 			}
// 		);
// 	};
// }

export const wrapThunkAsyncActionWorker = <TState, TParameters, TSuccess, TError>(
    asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
    worker: (params: TParameters) => Promise<TSuccess>
) => {
    return (params: TParameters) => async (dispatch: Dispatch<Action>, getState: () => TState) => {
        dispatch(asyncAction.started(params));
        return worker(params).then(
            result => {
                dispatch(asyncAction.done({ params, result }));
                return result;
            },
            (error: TError) => {
                dispatch(asyncAction.failed({ params, error }));
                return error;
            }
        );
    };
};

export const wrapThunkAsyncActionParamVoidWorker = <TState, TSuccess, TError>(
    asyncAction: AsyncActionCreators<void, TSuccess, TError>,
    worker: () => Promise<TSuccess>
) => {
    return () => async (dispatch: Dispatch<Action>, getState: () => TState) => {
        dispatch(asyncAction.started());
        return worker().then(
            result => {
                dispatch(asyncAction.done({ result }));
                return result;
            },
            (error: TError) => {
                dispatch(asyncAction.failed({ error }));
                return error;
            }
        );
    };
};
