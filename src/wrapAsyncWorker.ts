// from https://gist.github.com/ttamminen/fa3a4030efbb85701d9fe58a039fe19d#file-wrapasyncworker-ts
import { AsyncActionCreators } from 'typescript-fsa';

// https://github.com/aikoven/typescript-fsa/issues/5#issuecomment-255347353
export function wrapAsyncWorker<TParameters, TSuccess, TError>(
    asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
    worker: (params: TParameters) => Promise<TSuccess>
) {
    return function wrappedWorker(dispatch: any, params: TParameters): Promise<TSuccess> {
        dispatch(asyncAction.started(params));
        return worker(params).then(
            result => {
                dispatch(asyncAction.done({ params, result }));
                return result;
            },
            (error: TError) => {
                dispatch(asyncAction.failed({ params, error }));
                throw error;
            }
        );
    };
}

export const wrapThunkAsyncActionWorker = <TParameters, TSuccess, TError>(
    asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
    worker: (params: TParameters) => Promise<TSuccess>
) => {
    return (params: TParameters) => (dispatch: any, getState: () => any) => {
        dispatch(asyncAction.started(params));
        return worker(params).then(
            result => {
                dispatch(asyncAction.done({ params, result }));
                return result;
            },
            (error: TError) => {
                dispatch(asyncAction.failed({ params, error }));
                throw error;
            }
        );
    };
};

export const wrapThunkAsyncActionParamVoidWorker = <TSuccess, TError>(
    asyncAction: AsyncActionCreators<void, TSuccess, TError>,
    worker: () => Promise<TSuccess>
) => {
    return () => (dispatch: any, getState: () => any) => {
        dispatch(asyncAction.started());
        return worker().then(
            result => {
                dispatch(asyncAction.done({ result }));
                return result;
            },
            (error: TError) => {
                dispatch(asyncAction.failed({ error }));
                throw error;
            }
        );
    };
};
// export default wrapAsyncWorker;
