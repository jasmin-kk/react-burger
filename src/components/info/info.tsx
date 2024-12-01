import React, { FC } from 'react';
import style from './info.module.css';

interface Order {
  number: number;
  status: string;
}

interface InfoProps {
  orders: Order[];
}

export const Info: FC<InfoProps> = ({ orders }) => {
  const limitedOrders = orders.slice(0, 10);

  const readyOrders = limitedOrders.filter((order) => order.status === 'done');
  const inProgressOrders = limitedOrders.filter(
    (order) => order.status === 'created'
  );

  const splitOrders = (orders: Order[]) => {
    const chunkedOrders = [];
    for (let i = 0; i < orders.length; i += 5) {
      chunkedOrders.push(orders.slice(i, i + 5));
    }
    return chunkedOrders;
  };

  const readyOrderColumns = splitOrders(readyOrders);
  const inProgressOrderColumns = splitOrders(inProgressOrders);

  return (
    <div>
      <div className={style.ready}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={style.ordersContainer}>
            {readyOrderColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={style.column}>
                {column.map((order) => (
                  <p
                    key={order.number}
                    className={`text text_type_digits-default mb-2 ${style.color}`}
                  >
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={style.ordersContainer}>
            {inProgressOrderColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={style.column}>
                {column.map((order) => (
                  <p
                    key={order.number}
                    className="text text_type_digits-default mb-2"
                  >
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className="text text_type_digits-large mb-15">28 752</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">138</p>
    </div>
  );
};
