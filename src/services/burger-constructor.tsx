import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: [] as Ingredient[],
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        state.push(action.payload);
      },
      prepare: (ingredient: Ingredient) => {
        return {
          payload: {
            ...ingredient,
            id: uuidv4(), // Добавляем уникальный ID
          },
        };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      return state.filter((ingredient) => ingredient.id !== action.payload);
    },
    clearConstructor: () => [],
    updateIngredientOrder: (state, action: PayloadAction<Ingredient[]>) => {
      return action.payload; // Обновляем состояние на основе нового порядка
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  updateIngredientOrder,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
