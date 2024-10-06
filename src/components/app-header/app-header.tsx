import React from 'react';
import style from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  return (
    <div className={style.background}>
      <header className={style.header}>
        <div className={style.block}>
          <a
            className={`pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${style.mainText}`}
          >
            <BurgerIcon type="primary" className="m-2" />
            Конструктор
          </a>
          <a
            className={`pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${style.text}`}
          >
            <ListIcon type="secondary" className="m-2" />
            Лента заказов
          </a>
        </div>
        <Logo className={style.logo} />
        <a
          className={`pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${style.text}`}
        >
          <ProfileIcon type="secondary" className="m-2" />
          Личный кабинет
        </a>
      </header>
    </div>
  );
};
