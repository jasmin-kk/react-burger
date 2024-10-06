import React, {FC, useState} from 'react';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import { Ingredient } from '../../utils/data';

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  ingredients,
}) => {
  const [current, setCurrent] = useState('one');
  return (
    <div className={style.block}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <IngredientsGroup ingredients={ingredients} />
    </div>
  );
};
