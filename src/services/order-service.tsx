import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

interface Order {
  _id: string;
  status: string;
  ingredients: string[];
}

let socket: WebSocket | null = null;

export const socketProfileMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === fetchOrders.pending.type) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return next(action);
      }

      socket = new WebSocket(`${SOCKET_URL}?token=${token}`);

      socket.onopen = () => {
        console.log('WebSocket подключен');
      };

      socket.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          store.dispatch(updateOrders(data));
        } else if (data.message === 'Invalid or missing token') {
          store.dispatch(setError('Токен недействителен или отсутствует.'));
        }
      };

      socket.onerror = (error: any) => {
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

const ordersProfileSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
      state.status = 'succeeded';
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export const { updateOrders, setError } = ordersProfileSlice.actions;

export default ordersProfileSlice.reducer;
