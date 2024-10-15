import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: null as Ingredient | null,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<Ingredient>) =>
      action.payload,
    clearIngredientDetails: () => null,
  },
});

export const { setIngredientDetails, clearIngredientDetails } =
  ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
