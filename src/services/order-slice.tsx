import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Order {
  _id: string;
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

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (payload: { url: string; token: string }, { dispatch }) => {
    const socket = new WebSocket(`${payload.url}?token=${payload.token}`);

    return new Promise((resolve, reject) => {
      socket.onopen = () => {
        socket.send(JSON.stringify({ action: 'getOrders' }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          dispatch(
            updateOrders({
              orders: data.orders,
              total: data.total,
              totalToday: data.totalToday,
            })
          );
          resolve(data);
        } else {
          reject(new Error('Ошибка при получении данных'));
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  }
);

const ordersSlice = createSlice({
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

export const { updateOrders, setError } = ordersSlice.actions;

export default ordersSlice.reducer;
