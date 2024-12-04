import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './services/root-reducer';
import { socketMiddleware } from './services/socket-middleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { wsActions } from './services/socket-middleware';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
