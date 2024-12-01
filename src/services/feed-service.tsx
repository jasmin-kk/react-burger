import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

let socket: WebSocket | null = null;

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

export const socketMiddleware =
  (store: { dispatch: (action: { type: string; payload?: any }) => void }) =>
  (next: any) =>
  (action: any) => {
    if (action.type === fetchOrders.pending.type) {
      socket = new WebSocket(SOCKET_URL);

      socket.onopen = () => {
        console.log('WebSocket подключен');
        socket?.send(JSON.stringify({ action: 'getOrders' }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          store.dispatch(updateOrders(data));
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket ошибка:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket закрыт');
      };
    }

    if (action.type === fetchOrders.rejected.type) {
      if (socket) {
        socket.close();
      }
    }

    return next(action);
  };

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return new Promise<void>((resolve) => resolve());
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    total: 0,
    totalToday: 0,
    status: 'idle',
    error: null as string | null,
  } as OrdersState,
  reducers: {
    updateOrders: (state, action) => {
      const { orders, total, totalToday } = action.payload;

      const mergedOrders = [...state.orders];

      orders.forEach((order: Order) => {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { updateOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
