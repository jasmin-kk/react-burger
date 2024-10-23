import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients';
import burgerConstructorSlice from './burger-constructor';
import ingredientDetailsSlice from './ingredient-details';
import orderSlice from './order-object';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  ingredientDetails: ingredientDetailsSlice,
  order: orderSlice,
});

export default rootReducer;
