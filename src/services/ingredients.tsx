import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';
import { BASE_URL } from '../utils/api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const data = await response.json();
    return data.data;
  }
);

interface IngredientsState {
  ingredients: Ingredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default ingredientsSlice.reducer;
