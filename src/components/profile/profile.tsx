import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchUserData, updateUserData, logoutUser } from '../../services/auth';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import style from './profile.module.css';

export const Profile: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isNameFocused, setIsNameFocused] = React.useState(false);
  const [isEmailFocused, setIsEmailFocused] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, password };
    dispatch(updateUserData(userData));
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await dispatch(logoutUser(refreshToken));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  };

  return (
    <div className={style.main}>
      <div className={style.menu}>
        <a className={`text text_type_main-medium ${style.nav}`}>Профиль</a>
        <a className="text text_type_main-medium text_color_inactive">
          История заказов
        </a>
        <a
          className="text text_type_main-medium text_color_inactive"
          onClick={handleLogout}
        >
          Выход
        </a>
      </div>
      <form className={style.inputs} onSubmit={handleSave}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          icon={isNameFocused ? 'CloseIcon' : 'EditIcon'}
          value={name}
          name="name"
          error={false}
          onFocus={() => handleFocus(setIsNameFocused)}
          onBlur={() => handleBlur(setIsNameFocused)}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1"
        />
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          icon={isEmailFocused ? 'CloseIcon' : 'EditIcon'}
          value={email}
          name="email"
          error={false}
          onFocus={() => handleFocus(setIsEmailFocused)}
          onBlur={() => handleBlur(setIsEmailFocused)}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1"
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          icon={isPasswordFocused ? 'CloseIcon' : 'EditIcon'}
          value={password}
          name="password"
          error={false}
          onFocus={() => handleFocus(setIsPasswordFocused)}
          onBlur={() => handleBlur(setIsPasswordFocused)}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1"
        />
        <div className={style.btns}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
