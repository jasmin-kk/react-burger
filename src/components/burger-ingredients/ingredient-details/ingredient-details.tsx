import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import { Ingredient } from '../../../utils/data';
import style from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];

    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );

    if (foundIngredient) {
      setIngredient(foundIngredient);
    } else {
      console.error('Ингредиент не найден');
    }
  }, [ingredients]);

  if (!ingredient) {
    return <p>Ингредиент не найден.</p>;
  }

  return (
    <div className={style.modal}>
      <img src={ingredient.image_large} alt="ингредиент" />
      <h3 className="text text_type_main-medium mt-4 mb-15">
        {ingredient.name}
      </h3>
      <div className={style.info}>
        <div className={style.title}>
          <p className="text text_type_main-small">Калории, ккал</p>
          <p className="text text_type_main-small">Белки, г</p>
          <p className="text text_type_main-small">Жиры, г</p>
          <p className="text text_type_main-small">Углеводы, г</p>
        </div>
        <div className={style.value}>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};
