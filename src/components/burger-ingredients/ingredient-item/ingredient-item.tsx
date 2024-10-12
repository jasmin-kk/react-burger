import React, { FC } from 'react';
import { Ingredient } from '../../../utils/data';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-item.module.css';

interface IngredientItemProps {
  ingredient: Ingredient;
}

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
  return (
    <div className={style.block}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_digits-default m-3">
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};
