import React, { FC } from 'react';
import style from '../profile/profile.module.css';
import { logoutUser } from '../../services/auth';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export const MenuNav: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (route)

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleOrderHistoryClick = () => {
    navigate('/profile/order');
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className={style.menu}>
      <a
        className={`text text_type_main-medium ${style.nav} ${
          location.pathname === '/profile/order' ? 'text_color_inactive' : ''
        }`}
        onClick={handleProfileClick}
      >
        Профиль
      </a>
      <a
        className={`text text_type_main-medium ${
          location.pathname === '/profile' ? 'text_color_inactive' : ''
        }`}
        onClick={handleOrderHistoryClick}
      >
        История заказов
      </a>
      <a
        className={`text text_type_main-medium ${style.nav} ${
          location.pathname === '/profile' ||
          location.pathname === '/profile/order'
            ? 'text_color_inactive'
            : ''
        }`}
        onClick={handleLogoutClick}
      >
        Выход
      </a>
    </div>
  );
};
