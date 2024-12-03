import React, { FC, useEffect } from 'react';
import { MenuNav } from '../menu-nav/menu-nav';
import { OrderCard } from '../order-card/order-card';
import style from './order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { wsActions } from '../../services/socket-middleware';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

export const Order: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector(
    (state) => state.wsOrders
  );
  const { ingredients } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const token = accessToken.startsWith('Bearer ')
        ? accessToken.slice(7)
        : accessToken;

      dispatch(wsActions.wsConnectionStart({ url: SOCKET_URL, token }));
    } else {
      console.error('Access token is not available');
    }
  }, [dispatch]);

  return (
    <div className={style.main}>
      <MenuNav />
      <div className={style.scroll}>
        {orders.length === 0 ? (
          <p>У вас нет заказов.</p>
        ) : (
          orders.map((order) => (
            <div className={style.block} key={order._id}>
              <Link
                to={`/profile/order/${order._id}`}
                state={{ backgroundLocation: location }}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <OrderCard order={order} ingredients={ingredients} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
