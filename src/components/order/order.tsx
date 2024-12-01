import React, { FC, useEffect, useState } from 'react';
import { MenuNav } from '../menu-nav/menu-nav';
import { OrderCard } from '../order-card/order-card';
import style from './order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

export const Order: FC = () => {
  const location = useLocation();
  const [ordersProfile, setOrders] = useState<any[]>([]);

  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const token = accessToken.startsWith('Bearer ')
        ? accessToken.slice(7)
        : accessToken;

      const socketUrlWithToken = `${SOCKET_URL}?token=${token}`;

      const socket = new WebSocket(socketUrlWithToken);

      socket.onopen = () => {
        console.log('WebSocket подключен');
        socket.send(JSON.stringify({ action: 'getOrders' }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          console.log('Полученные данные:', data);
          setOrders(data.orders);
        }
      };

      socket.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket закрыт');
      };

      return () => {
        socket.close();
      };
    } else {
      console.error('Access token is not available');
    }
  }, []);

  return (
    <div className={style.main}>
      <MenuNav />
      <div className={style.scroll}>
        {ordersProfile.length === 0 ? (
          <p>У вас нет заказов.</p>
        ) : (
          ordersProfile.map((order: any) => (
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
