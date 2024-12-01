import React, { FC } from 'react';
import style from './order-card.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderCardProps {
  order: any;
  ingredients: any[];
}

export const OrderCard: FC<OrderCardProps> = ({ order, ingredients }) => {
  const today = new Date();

  const getIngredientsById = (ingredientIds: string[]) => {
    return ingredientIds.map((id) =>
      ingredients.find((ingredient) => ingredient._id === id)
    );
  };

  const orderIngredients = getIngredientsById(order.ingredients);

  return (
    <div className={style.main}>
      <div className={style.header}>
        <span className="text text_type_main-default">#{order.number}</span>
        <span className={style.date}>
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
      </div>
      <p className="text text_type_main-medium m-2">{order.name}</p>
      <p className="text text_type_main-small m-6">{order.status}</p>
      <div className={style.bottom}>
        <div className={style.circleContainer}>
          {orderIngredients.map((ingredient, index) =>
            ingredient ? (
              <div
                key={ingredient._id}
                className={style.circle}
                style={{
                  backgroundImage: `url(${ingredient.image})`,
                }}
              ></div>
            ) : null
          )}
        </div>
        <div className={style.sum}>
          <p className="text text_type_main-default mr-2">
            {orderIngredients.reduce(
              (sum, ingredient) => sum + (ingredient ? ingredient.price : 0),
              0
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
