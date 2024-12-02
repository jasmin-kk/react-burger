import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Order {
  _id: string;
  status: string;
  ingredients: string[];
}

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
