import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Ingredient } from '../../utils/data';
import {
  addIngredient,
  removeIngredient,
} from '../../services/burger-constructor';
import style from './home.module.css';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, error } = useAppSelector((state) => state.ingredients);
  const { ingredientCounts } = useAppSelector(
    (state) => state.burgerConstructor
  );

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
          data-testid="burger-constructor"
        />
        <div id="modal-root"></div>
      </div>
    </DndProvider>
  );
};
