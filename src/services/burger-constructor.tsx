import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: [] as Ingredient[],
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      return state.filter((_, index) => index !== action.payload);
    },
    clearConstructor: () => [],
  },
});

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
