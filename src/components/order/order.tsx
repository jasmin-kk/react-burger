import React, { FC } from 'react';
import { MenuNav } from '../menu-nav/menu-nav';
import { OrderCard } from '../order-card/order-card';
import style from './order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Order: FC = () => {
  const location = useLocation();

  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );

  const order = location.state?.order;

  if (!order) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={style.main}>
      <MenuNav />
      <Link
        to={`/profile/order/${order._id}`}
        state={{
          backgroundLocation: location,
        }}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <OrderCard order={order} ingredients={ingredients} />
      </Link>
    </div>
  );
};
