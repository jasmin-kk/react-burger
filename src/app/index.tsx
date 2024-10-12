import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/ingredients';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import style from './app.module.scss';
import { RootState, AppDispatch } from '../store';

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <AppHeader />
      <div className={style.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
        <div id="modal-root"></div>
      </div>
    </>
  );
};
