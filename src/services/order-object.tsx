import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../utils/data';

interface OrderState {
  order: Order | null;
}

const initialOrderState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
