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

  const visibleIngredients = orderIngredients.slice(0, 5);
  const extraIngredientsCount =
    orderIngredients.length - visibleIngredients.length;

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
          {visibleIngredients.map((ingredient, index) => (
            <div
              key={ingredient._id}
              className={style.circle}
              style={{
                backgroundImage: `url(${ingredient.image})`,
              }}
            ></div>
          ))}
          {extraIngredientsCount > 0 && (
            <div
              key="extra"
              className={`${style.circle} ${style.extra} text text_type_main-small`}
              style={{
                backgroundImage: `url(${
                  visibleIngredients[visibleIngredients.length - 1]?.image
                })`,
              }}
            >
              +{extraIngredientsCount}
            </div>
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
