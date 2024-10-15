import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

interface BurgerConstructorState {
  ingredients: Ingredient[];
  ingredientCounts: Record<string, number>;
}

const initialState: BurgerConstructorState = {
  ingredients: [],
  ingredientCounts: {},
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        state.ingredients.push(action.payload);
        const increment = action.payload.type === 'bun' ? 2 : 1; // Увеличиваем счетчик
        state.ingredientCounts[action.payload._id] =
          (state.ingredientCounts[action.payload._id] || 0) + increment;
      },
      prepare: (ingredient: Ingredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4(), // Keeping id for other purposes, but primarily use _id
        },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient._id === ingredientId // Use _id here
      );

      if (ingredientIndex > -1) {
        const ingredient = state.ingredients[ingredientIndex];
        const decrement = ingredient.type === 'bun' ? 2 : 1; // Уменьшаем счетчик
        state.ingredientCounts[ingredient._id] = Math.max(
          (state.ingredientCounts[ingredient._id] || 0) - decrement,
          0
        );

        state.ingredients.splice(ingredientIndex, 1); // Удаляем ингредиент
      }
    },
    clearConstructor: () => initialState,
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
