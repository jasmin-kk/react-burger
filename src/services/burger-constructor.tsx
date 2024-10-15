import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    ingredients: [] as Ingredient[],
    ingredientCounts: {} as Record<string, number>, // Добавьте это
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        state.ingredients.push(action.payload);
        state.ingredientCounts[action.payload._id] =
          (state.ingredientCounts[action.payload._id] || 0) +
          (action.payload.type === 'bun' ? 2 : 1);
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
      const ingredientId = action.payload;
      const ingredient = state.ingredients.find(
        (ing) => ing.id === ingredientId
      );
      if (ingredient) {
        state.ingredientCounts[ingredientId] = Math.max(
          (state.ingredientCounts[ingredientId] || 0) - 1,
          0
        );
        if (state.ingredientCounts[ingredientId] === 0) {
          delete state.ingredientCounts[ingredientId]; // Удаляем счетчик, если он стал нулевым
        }
      }
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== ingredientId
      );
    },
    clearConstructor: () => ({ ingredients: [], ingredientCounts: {} }),
    updateIngredientOrder: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload; // Обновляем состояние на основе нового порядка
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
