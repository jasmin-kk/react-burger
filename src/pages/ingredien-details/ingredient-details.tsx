import React, { FC } from 'react';
import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { AppHeader } from '../../components/app-header/app-header';
import style from './ingredient-details.module.css';

export const IngredientDetailsPage: FC = () => {
  return (
    <>
      <AppHeader />
      <h1 className={`text text_type_main-large ${style.text}`}>
        Детали ингридиента
      </h1>
      <IngredientDetails />
    </>
  );
};
