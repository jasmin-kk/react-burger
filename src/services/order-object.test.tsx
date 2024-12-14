import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { placeOrder } from './order-object';

describe('orderSlice simple tests', () => {
  const store = configureStore({
    reducer: { order: orderReducer },
  });

  it('should have initial state', () => {
    const state = store.getState().order;
    expect(state).toEqual({
      order: null,
      loading: false,
      error: null,
    });
  });

  it('should handle placeOrder.rejected', async () => {
    const ingredientsIds = ['ing1', 'ing2'];

    const rejectedAction = {
      type: 'order/placeOrder/rejected',
      payload: 'Ошибка при создании заказа',
    };

    store.dispatch(rejectedAction);

    const state = store.getState().order;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка при создании заказа');
    expect(state.order).toBeNull();
  });
});
