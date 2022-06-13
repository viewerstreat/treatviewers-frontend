import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import {createStore, applyMiddleware, AnyAction} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import reducers, {RootState} from './reducer';

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
