import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/ingredients';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import style from './app.module.scss';
import { RootState, AppDispatch } from '../store';
import { Ingredient } from '../utils/data';
import {
  addIngredient,
  removeIngredient,
} from '../services/burger-constructor';

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );
  const { ingredientCounts } = useSelector(
    (state: RootState) => state.burgerConstructor
  ); // Изменения здесь

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientDrop = (ingredient: Ingredient) => {
    dispatch(addIngredient(ingredient)); // Теперь просто вызываем Redux-экшн
  };

  const handleIngredientRemove = (ingredientId: string) => {
    dispatch(removeIngredient(ingredientId)); // Теперь просто вызываем Redux-экшн
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <div className={style.main}>
        <BurgerIngredients
          ingredients={ingredients}
          ingredientCounts={ingredientCounts} // Передаем счетчики из Redux
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
