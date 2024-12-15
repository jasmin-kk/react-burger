import React, { FC } from 'react';
import { useAppSelector } from '../../../store';
import doneImage from '../../../images/done.png';
import style from '../order-details/order-details.module.css';

export const OrderDetails: FC = () => {
  const order = useAppSelector((state) => state.order.order);

  return (
    <div className={style.main} data-testid="order-details">
      {order ? (
        <>
          <h3
            className="text text_type_digits-large mb-8"
            data-testid="order-number"
          >
            {order.number}
          </h3>
          <p
            className="text text_type_main-medium mb-15"
            data-testid="order-identifier"
          >
            идентификатор заказа
          </p>
          <img
            className={`mb-15 ${style.img}`}
            src={doneImage}
            alt="done"
            data-testid="order-image"
          />
          <p
            className="text text_type_main-small mb-2"
            data-testid="order-status"
          >
            Ваш заказ начали готовить
          </p>
          <p
            className={`text text_type_main-small mb-30 ${style.color}`}
            data-testid="order-message"
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <p data-testid="no-order">Заказ еще не создан</p>
      )}
    </div>
  );
};
