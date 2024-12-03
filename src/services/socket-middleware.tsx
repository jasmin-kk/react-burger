import {
  createAction,
  Middleware,
  ActionCreatorWithPayload,
  createReducer,
} from '@reduxjs/toolkit';

export const wsActions = {
  wsConnectionStart: createAction<{ url: string; token?: string }>(
    'wsConnectionStart'
  ),
  wsConnectionSuccess: createAction<any>('wsConnectionSuccess'),
  wsConnectionError: createAction<string>('wsConnectionError'),
  wsConnectionClose: createAction<null>('wsConnectionClose'),
  wsMessageReceived: createAction<{
    orders: Order[];
    total: number;
    totalToday: number;
  }>('wsMessageReceived'),
};

interface TWsActions {
  wsConnectionStart: ActionCreatorWithPayload<{ url: string; token?: string }>;
  wsConnectionSuccess: ActionCreatorWithPayload<any>;
  wsConnectionError: ActionCreatorWithPayload<string>;
  wsConnectionClose: ActionCreatorWithPayload<null>;
  wsMessageReceived: ActionCreatorWithPayload<{
    orders: Order[];
    total: number;
    totalToday: number;
  }>;
}

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => (next) => (action: any) => {
    if (action.type === wsActions.wsConnectionStart.type) {
      const { url, token } = action.payload;
      if (!url) {
        return next(action);
      }

      const socketUrl = token ? `${url}?token=${token}` : url;
      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log('WebSocket подключен');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          store.dispatch(wsActions.wsMessageReceived(data));
        } else if (data.message === 'Invalid or missing token') {
          store.dispatch(
            wsActions.wsConnectionError('Токен недействителен или отсутствует.')
          );
        }
      };

      socket.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket закрыт');
      };

      action.payload.socket = socket;
    }

    if (
      action.type === wsActions.wsConnectionClose.type &&
      action.payload.socket
    ) {
      action.payload.socket.close();
    }

    return next(action);
  };
};

interface Order {
  _id: string;
  number: number;
  name: string;
  status: string;
  ingredients: string[];
}

interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null,
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsActions.wsMessageReceived, (state, action) => {
      const { orders, total, totalToday } = action.payload;

      const mergedOrders = [...state.orders];

      orders.forEach((order) => {
        const existingOrderIndex = mergedOrders.findIndex(
          (existingOrder) => existingOrder._id === order._id
        );
        if (existingOrderIndex === -1) {
          mergedOrders.push(order);
        } else {
          mergedOrders[existingOrderIndex] = order;
        }
      });

      state.orders = mergedOrders;
      state.total = total;
      state.totalToday = totalToday;
      state.status = 'succeeded';
    })
    .addCase(wsActions.wsConnectionError, (state, action) => {
      console.error(action.payload);
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(wsActions.wsConnectionClose, (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.status = 'idle';
    });
});

export { ordersReducer };
