import React, { FC } from 'react';
import style from './order-card.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderCard: FC = () => {
  const today = new Date();
  return (
    <div className={style.main}>
      <div className={style.header}>
        <span className="text text_type_main-default">#034534</span>
        <span className={style.date}>
          <FormattedDate
            date={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                today.getHours(),
                today.getMinutes() - 1,
                0
              )
            }
          />
        </span>
      </div>
      <p className="text text_type_main-medium m-2">Interstellar бургер</p>
      <p className="text text_type_main-small m-6">Готовится</p>
      <div className={style.bottom}>
        <div className={style.circleContainer}>
          <div
            className={style.circle}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          ></div>
          <div
            className={style.circle}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          ></div>
          <div
            className={style.circle}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          ></div>
          <div
            className={style.circle}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          ></div>
          <div
            className={style.circle}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          ></div>
          <div
            className={`${style.circle} ${style.extra} text text_type_main-small`}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          >
            +3
          </div>
        </div>
        <div className={style.sum}>
          <p className="text text_type_main-default mr-2">560</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
