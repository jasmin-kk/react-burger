import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchUserData, updateUserData } from '../../services/auth';
import style from './profile.module.css';
import { MenuNav } from '../menu-nav/menu-nav';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authSlice.user);

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

  return (
    <div className={style.main}>
      <MenuNav></MenuNav>
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
