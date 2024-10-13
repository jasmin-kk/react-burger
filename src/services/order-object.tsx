import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../utils/data';

interface OrderState {
  order: Order | null;
  loading: boolean;
  error: string | null;
}

const initialOrderState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://norma.nomoreparties.space/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients: ingredientsIds }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при оформлении заказа');
      }

      const data = await response.json();
      return data.order;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
