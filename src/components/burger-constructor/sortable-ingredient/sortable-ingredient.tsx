import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/data';
import style from './sortable-ingredient.module.css';

interface SortableIngredientProps {
  ingredient: Ingredient;
  index: number;
  moveIngredient: (fromIndex: number, toIndex: number) => void;
  handleRemove: (ingredientId: string) => void;
}

export const SortableIngredient: FC<SortableIngredientProps> = ({
  ingredient,
  index,
  moveIngredient,
  handleRemove,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: 'sortableIngredient',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'sortableIngredient',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={style.scrollBlock}>
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass="m-1"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleRemove(ingredient._id)}
      />
    </div>
  );
};
