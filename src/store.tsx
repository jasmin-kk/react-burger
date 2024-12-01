import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/services/root-reducer';
import { socketMiddleware } from '../src/services/feed-service';
import { socketProfileMiddleware } from './services/order-service';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware, socketProfileMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
