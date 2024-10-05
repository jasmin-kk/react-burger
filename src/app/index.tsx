import React, {FC, useEffect, useState} from 'react';
import { fetchIngredients } from '../utils/api';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { AppHeader } from '../components/app-header/app-header';
import style from './app.module.scss';
import { Ingredient } from '../utils/data';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

export const Index: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await fetchIngredients();
        setIngredients(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      }
    };

    getIngredients();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <AppHeader></AppHeader>
      <div className={style.main}>
        <BurgerIngredients ingredients={ingredients}></BurgerIngredients>
        <BurgerConstructor ingredients={ingredients}></BurgerConstructor>
        <div id="modal-root"></div>
      </div>
    </>
  );
};
