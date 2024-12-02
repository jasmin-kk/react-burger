import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './services/root-reducer';
import { socketMiddleware } from './services/feed-service';
import { socketProfileMiddleware } from './services/order-service';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware, socketProfileMiddleware),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
