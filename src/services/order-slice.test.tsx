import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, { updateOrders, setError } from './order-slice';

describe('ordersProfileSlice', () => {
  const store = configureStore({
    reducer: { orders: ordersReducer },
  });

  it('should have initial state', () => {
    const state = store.getState().orders;
    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: 'idle',
      error: null,
    });
  });

  it('should handle updateOrders', () => {
    const ordersPayload = {
      orders: [
        { _id: '1', status: 'completed', ingredients: ['ingredient1'] },
        { _id: '2', status: 'pending', ingredients: ['ingredient2'] },
      ],
      total: 2,
      totalToday: 1,
    };

    store.dispatch(updateOrders(ordersPayload));

    const state = store.getState().orders;
    expect(state.orders).toEqual(ordersPayload.orders);
    expect(state.total).toBe(ordersPayload.total);
    expect(state.totalToday).toBe(ordersPayload.totalToday);
    expect(state.status).toBe('succeeded');
  });

  it('should handle setError', () => {
    const errorPayload = 'An error occurred';

    store.dispatch(setError(errorPayload));

    const state = store.getState().orders;
    expect(state.error).toBe(errorPayload);
    expect(state.status).toBe('failed');
  });
});