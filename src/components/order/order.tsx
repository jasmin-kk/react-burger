import React, { FC } from 'react';
import { MenuNav } from '../menu-nav/menu-nav';
import { OrderCard } from '../order-card/order-card';
import style from './order.module.css';
import { Link, useLocation } from 'react-router-dom';

export const Order: FC = () => {
  const location = useLocation();

  return (
    <div className={style.main}>
      <MenuNav></MenuNav>
      <Link
        to={`/profile/order/:id}`}
        state={{
          backgroundLocation: { location },
        }}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <OrderCard></OrderCard>
      </Link>
    </div>
  );
};
