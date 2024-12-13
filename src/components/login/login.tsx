import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store';
import { loginUser } from '../../services/auth';
import style from './login.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state) => state.authSlice.error);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password: pass }));
  };

  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Вход</h1>
      {error && (
        <p className="text text_type_main-default mb-4">{error}</p>
      )}{' '}
      <form onSubmit={handleLogin}>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          size={'default'}
          extraClass="ml-1 mb-6"
        />
        <div className={style.block}>
          <PasswordInput
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name={'password'}
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mb-8 ${style.width}`}
          >
            Войти
          </Button>
        </div>
        <p className={`text text_type_main-default mb-4 ${style.text}`}>
          Вы — новый пользователь?
          <Link to="/register" className={style.btn}>
            {' '}
            Зарегистрироваться
          </Link>
        </p>
        <p className={`text text_type_main-default mb-4 ${style.text}`}>
          Забыли пароль?
          <Link to="/forgot-password" className={style.btn}>
            {' '}
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
};
