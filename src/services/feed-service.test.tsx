import reducer, { updateOrders, fetchOrders } from './feed-service';
import { Order, OrdersState } from './feed-service';

describe('ordersSlice', () => {
  const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: 'idle',
    error: null,
  };

  it('should return the initial state when called with undefined', () => {
    expect(reducer(undefined, { type: 'test' })).toEqual(initialState);
  });

  it('should handle updateOrders', () => {
    const newOrders: Order[] = [
      {
        _id: '1',
        number: 1001,
        name: 'Order 1',
        status: 'pending',
        ingredients: ['ingredient-1', 'ingredient-2'],
      },
      {
        _id: '2',
        number: 1002,
        name: 'Order 2',
        status: 'completed',
        ingredients: ['ingredient-3'],
      },
    ];
    const action = updateOrders({
      orders: newOrders,
      total: 10,
      totalToday: 5,
    });

    const nextState = reducer(initialState, action);

    expect(nextState.orders).toEqual(newOrders);
    expect(nextState.total).toBe(10);
    expect(nextState.totalToday).toBe(5);
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle fetchOrders.pending', () => {
    const nextState = reducer(
      initialState,
      fetchOrders.pending('fetchOrders', undefined)
    );

    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchOrders.rejected', () => {
    const errorMessage = 'Error fetching orders';
    const nextState = reducer(
      initialState,
      fetchOrders.rejected(new Error(errorMessage), 'fetchOrders', undefined)
    );

    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe(errorMessage);
  });
});
