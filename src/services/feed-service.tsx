import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from '@reduxjs/toolkit';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

let socket: WebSocket | null = null;

const socketMiddleware = (store: {
  dispatch: (arg0: { payload: any; type: 'orders/updateOrders' }) => void;
}) => {
  return (next: any) => (action: any) => {
    if (action.type === fetchOrders.pending) {
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

    if (action.type === fetchOrders.rejected) {
      if (socket) {
        socket.close();
      }
    }

    return next(action);
  };
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
  },
  reducers: {
    updateOrders: (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
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

const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export { store };
