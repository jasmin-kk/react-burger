import React, { FC } from 'react';
import { Ingredient } from '../../../utils/data';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import style from './ingredient-item.module.css';

interface IngredientItemProps {
  ingredient: Ingredient;
  count: number;
}

export const IngredientItem: FC<IngredientItemProps> = ({
  ingredient,
  count,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={style.block}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-testid="ingredient-item"
    >
      <Counter count={count} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_digits-default m-3">
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};
