import React, { FC } from 'react';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { AppHeader } from '../components/app-header/app-header';

export const IngredientDetailsPage: FC = () => {
  return (
    <>
      <AppHeader /> <IngredientDetails />
    </>
  );
};
