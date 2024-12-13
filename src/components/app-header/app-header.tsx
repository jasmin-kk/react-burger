import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import style from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  const location = useLocation();

  return (
    <div className={style.background}>
      <header className={style.header}>
        <div className={style.block}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${
                isActive ? style.mainText : style.text
              }`
            }
          >
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
              className="m-2"
            />
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${
                isActive ? style.mainText : style.text
              }`
            }
          >
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
              className="m-2"
            />
            Лента заказов
          </NavLink>
        </div>
        <Logo className={style.logo} />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `pl-5 pr-5 pb-5 m-2 pt-5 text text_type_main-default ${
              isActive ? style.mainText : style.text
            }`
          }
        >
          <ProfileIcon
            type={location.pathname === '/profile' ? 'primary' : 'secondary'}
            className="m-2"
          />
          Личный кабинет
        </NavLink>
      </header>
    </div>
  );
};
