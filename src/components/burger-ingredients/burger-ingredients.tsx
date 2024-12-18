import React, { FC, useState } from 'react';
import { Ingredient } from '../../utils/data';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
  ingredientCounts: Record<string, number>;
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  ingredients,
  ingredientCounts,
}) => {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={style.block}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={style.df}>
        <Tab
          value="bun"
          active={current === 'bun'}
          onClick={() => setCurrent('bun')}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === 'sauce'}
          onClick={() => setCurrent('sauce')}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === 'main'}
          onClick={() => setCurrent('main')}
        >
          Начинки
        </Tab>
      </div>
      <IngredientsGroup
        ingredients={ingredients}
        ingredientCounts={ingredientCounts}
        onTabChange={setCurrent}
      />
    </div>
  );
};
