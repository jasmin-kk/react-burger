import React, { FC } from 'react';
import style from './order-details.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails: FC = () => {
  const today = new Date();
  return (
    <div className={style.main}>
      <p className={`text text_type_digits-default mb-8 ${style.center}`}>
        #034533
      </p>
      <p className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
      </p>
      <p className={`text text_type_main-default ${style.color} mb-15`}>
        Выполнен
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={style.scroll}>
        <div className={style.block}>
          <div
            className={`mr-4 ${style.img}`}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          />
          <div className={style.end}>
            <p className="text text_type_main-default">
              Флюоресцентная булка R2-D3
            </p>
            <div className={style.elementSum}>
              <p className="text text_type_digits-default mr-2">2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.block}>
          <div
            className={`mr-4 ${style.img}`}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          />
          <div className={style.end}>
            <p className="text text_type_main-default">
              Флюоресцентная булка R2-D3
            </p>
            <div className={style.elementSum}>
              <p className="text text_type_digits-default mr-2">2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.block}>
          <div
            className={`mr-4 ${style.img}`}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          />
          <div className={style.end}>
            <p className="text text_type_main-default">
              Флюоресцентная булка R2-D3
            </p>
            <div className={style.elementSum}>
              <p className="text text_type_digits-default mr-2">2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.block}>
          <div
            className={`mr-4 ${style.img}`}
            style={{
              backgroundImage:
                "url('https://code.s3.yandex.net/react/code/bun-02.png')",
            }}
          />
          <div className={style.end}>
            <p className="text text_type_main-default">
              Флюоресцентная булка R2-D3
            </p>
            <div className={style.elementSum}>
              <p className="text text_type_digits-default mr-2">2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
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
        <div className={style.total}>
          <p className=" text text_type_digits-default mr-2">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
