import React, { FC } from 'react';
import style from './feed.module.css';
import { OrderCard } from '../order-card/order-card';
import { Info } from '../info/info';
import { Link, useLocation } from 'react-router-dom';

export const Feed: FC = () => {
  const location = useLocation();

  return (
    <div className={style.main}>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={style.block}>
        <div className={style.order}>
          <Link
            to={`/feed/:id}`}
            state={{
              backgroundLocation: { location },
            }}
            style={{ textDecoration: 'none' }}
          >
            <OrderCard></OrderCard>
          </Link>
        </div>
        <Info></Info>
      </div>
    </div>
  );
};
