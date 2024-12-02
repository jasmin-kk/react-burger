import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/reset-password';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';

export const ResetPassword: FC = () => {
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        resetPassword({ password: pass, token: code })
      );
      if (resetPassword.fulfilled.match(result)) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Ошибка сброса пароля:', error);
    }
  };

  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.block}>
          <PasswordInput
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name={'password'}
            placeholder={'Введите новый пароль'}
            extraClass="mb-6"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={'code'}
            error={false}
            size={'default'}
            extraClass="ml-1 mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mb-8 ${style.width}`}
          >
            Сохранить
          </Button>
          <p className={`text text_type_main-default ${style.text}`}>
            Вспомнили пароль?
            <a className={style.btn}> Войти</a>
          </p>
        </div>
      </form>
    </div>
  );
};
