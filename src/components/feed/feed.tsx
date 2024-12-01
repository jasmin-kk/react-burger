import React, { FC, useEffect, useState } from 'react';
import style from './feed.module.css';
import { OrderCard } from '../order-card/order-card';
import { Info } from '../info/info';
import { Link, useLocation } from 'react-router-dom';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

export const Feed: FC = () => {
  const location = useLocation();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

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
  }, []);

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
                <OrderCard></OrderCard>
              </Link>
            ))}
          </div>
        </div>
        <Info></Info>
      </div>
    </div>
  );
};
