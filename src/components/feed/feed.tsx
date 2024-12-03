import React, { FC, useEffect } from 'react';
import style from './feed.module.css';
import { OrderCard } from '../order-card/order-card';
import { Info } from '../info/info';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { wsActions } from '../../services/socket-middleware';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

export const Feed: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector(
    (state) => state.wsOrders
  );
  const { ingredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(wsActions.wsConnectionStart({ url: SOCKET_URL }));

    return () => {
      dispatch(wsActions.wsConnectionClose(null));
    };
  }, [dispatch]);

  return (
    <div className={style.main}>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={style.block}>
        <div className={style.scroll}>
          <div className={style.order}>
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/feed/${order._id}`}
                state={{ backgroundLocation: location }}
                style={{ textDecoration: 'none' }}
              >
                <OrderCard order={order} ingredients={ingredients} />
              </Link>
            ))}
          </div>
        </div>
        <Info orders={orders} total={total} totalToday={totalToday} />
      </div>
    </div>
  );
};
