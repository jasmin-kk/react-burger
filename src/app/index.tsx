import React, { FC, useEffect, useState } from 'react';
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

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );
  const [ingredientCounts, setIngredientCounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientDrop = (ingredient: Ingredient) => {
    setIngredientCounts((prevCounts) => ({
      ...prevCounts,
      [ingredient._id]: (prevCounts[ingredient._id] || 0) + 1,
    }));
  };

  const handleIngredientRemove = (ingredientId: string) => {
    setIngredientCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[ingredientId] > 0) {
        newCounts[ingredientId] -= 1;
      }
      return newCounts;
    });
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
