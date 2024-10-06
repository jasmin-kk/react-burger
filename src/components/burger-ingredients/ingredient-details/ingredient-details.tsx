import React, {FC} from 'react';
import { Ingredient } from '../../../utils/data';
import style from './ingredient-details.module.css';

interface IngredientDetailsProps {
  ingredient: Ingredient;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={style.modal}>
      <img src={ingredient.image_large} alt="ingredient" />
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
