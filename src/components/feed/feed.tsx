import React, { FC, useEffect, useState } from 'react';
import style from './feed.module.css';
import { OrderCard } from '../order-card/order-card';
import { Info } from '../info/info';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

export const Feed: FC = () => {
  const location = useLocation();
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);

  const { ingredients, error } = useSelector(
    (state: RootState) => state.ingredients
  );

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
        setTotal(data.total);
        setTotalToday(data.totalToday);
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
