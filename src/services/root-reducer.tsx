import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients';
import burgerConstructorSlice from './burger-constructor';
import ingredientDetailsSlice from './ingredient-details';
import orderSlice from './order-object';
import passwordSlice from './reset-password';
import authSlice from './auth';
import ordersSlice from './feed-service';
import ordersProfileSlice from './order-service';
import { ordersReducer } from './socket-middleware';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  ingredientDetails: ingredientDetailsSlice,
  order: orderSlice,
  passwordSlice: passwordSlice,
  authSlice: authSlice,
  orders: ordersSlice,
  ordersProfile: ordersProfileSlice,
  wsOrders: ordersReducer,
});

export default rootReducer;
