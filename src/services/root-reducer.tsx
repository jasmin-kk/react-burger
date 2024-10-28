import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients';
import burgerConstructorSlice from './burger-constructor';
import ingredientDetailsSlice from './ingredient-details';
import orderSlice from './order-object';
import passwordSlice from './reset-password';
import authSlice from './auth';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  ingredientDetails: ingredientDetailsSlice,
  order: orderSlice,
  passwordSlice: passwordSlice,
  authSlice: authSlice,
});

export default rootReducer;
