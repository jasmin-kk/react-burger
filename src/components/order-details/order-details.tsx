import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../services/feed-service';
import style from './order-details.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch } from '../../store';

export const OrderDetails: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const today = new Date();

  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const orders = useSelector((state: any) => state.orders.orders);
  const { ingredients } = useSelector((state: any) => state.ingredients);

  const pathParts = window.location.pathname.split('/');
  const orderId = pathParts[pathParts.length - 1];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const foundOrder = orders.find((order: any) => order._id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      fetch(`https://norma.nomoreparties.space/api/orders/${orderId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Order not found');
          }
          return response.json();
        })
        .then((data) => {
          setOrder(data.orders[0]);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [orders, orderId]);

  const getStatusTextAndColor = (status: string) => {
    if (status === 'done') {
      return { text: 'Выполнен', color: '#00CCCC' };
    } else if (status === 'created') {
      return { text: 'Создан', color: 'white' };
    } else {
      return { text: 'Готовится', color: 'white' };
    }
  };

  const statusTextAndColor = order
    ? getStatusTextAndColor(order.status)
    : { text: '', color: '' };
  const { text: statusText, color: statusColor } = statusTextAndColor;

  const orderIngredients = order
    ? order.ingredients.map((ingredientId: string) =>
        ingredients.find((ingredient: any) => ingredient._id === ingredientId)
      )
    : [];

  const groupedIngredients = orderIngredients.reduce(
    (acc: any, ingredient: any) => {
      if (ingredient) {
        if (acc[ingredient._id]) {
          acc[ingredient._id].count += 1;
          acc[ingredient._id].totalPrice += ingredient.price;
        } else {
          acc[ingredient._id] = {
            ingredient,
            count: 1,
            totalPrice: ingredient.price,
          };
        }
      }
      return acc;
    },
    {}
  );

  const groupedIngredientsArray = Object.values(groupedIngredients);

  const totalPrice = groupedIngredientsArray.reduce(
    (sum: number, { totalPrice }: any) => {
      return sum + totalPrice;
    },
    0
  );

  return (
    <div className={style.main}>
      {error ? (
        <p className="text text_type_main-medium">{error}</p>
      ) : order ? (
        <>
          <p className={`text text_type_digits-default mb-8 ${style.center}`}>
            #{order.number}
          </p>
          <p className="text text_type_main-medium mb-3">
            {order.name} острый бургер
          </p>
          <p
            className={`text text_type_main-default ${style.color} mb-15`}
            style={{ color: statusColor }}
          >
            {statusText}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={style.scroll}>
            {groupedIngredientsArray.map(
              ({ ingredient, count, totalPrice }: any, index: number) => (
                <div className={style.block} key={index}>
                  <div
                    className={style.img}
                    style={{
                      backgroundImage: `url(${ingredient.image})`, // Use the ingredient image from Redux
                    }}
                  />
                  <div className={style.end}>
                    <p className="text text_type_main-default">
                      {ingredient.name}
                    </p>
                    <div className={style.elementSum}>
                      <p className="text text_type_digits-default mr-2">
                        {count} x {ingredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className={style.footer}>
            <span className={style.date}>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0
                  )
                }
              />
            </span>
            <div className={style.total}>
              <p className="text text_type_digits-default mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
