import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState, AppDispatch } from '../../store';
import { Ingredient } from '../../utils/data';
import {
  addIngredient,
  removeIngredient,
} from '../../services/burger-constructor';
import style from './home.module.css';

export const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );
  const { ingredientCounts } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const isAuthenticated = useSelector(
    (state: RootState) =>
      !!state.authSlice.user || !!localStorage.getItem('accessToken')
  );

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectPath', window.location.pathname);
    }
  }, [isAuthenticated]);

  const handleIngredientDrop = (ingredient: Ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const handleIngredientRemove = (ingredientId: string) => {
    dispatch(removeIngredient(ingredientId));
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.main}>
        <BurgerIngredients
          ingredients={ingredients}
          ingredientCounts={ingredientCounts}
        />
        <BurgerConstructor
          ingredients={ingredients}
          onIngredientDrop={handleIngredientDrop}
          onIngredientRemove={handleIngredientRemove}
        />
        <div id="modal-root"></div>
      </div>
    </DndProvider>
  );
};
