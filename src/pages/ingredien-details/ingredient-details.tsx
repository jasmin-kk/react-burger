import React, { FC } from 'react';
import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import style from './ingredient-details.module.css';

export const IngredientDetailsPage: FC = () => {
  return (
    <>
      <h1 className={`text text_type_main-large ${style.text}`}>
        Детали ингридиента
      </h1>
      <div className={style.block}>
        <IngredientDetails />
      </div>
    </>
  );
};
