import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './forgot-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store';
import { forgotPassword } from '../../services/reset-password';
import { setHasRequestedPasswordReset } from '../../services/auth';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = React.useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useAppSelector(
    (state) => state.passwordSlice
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email)).then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(setHasRequestedPasswordReset(true));
        navigate('/reset-password');
      }
    });
  };

  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Укажите E-mail'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          size={'default'}
          extraClass="ml-1 mb-6"
        />
        {error && (
          <p className="text text_type_main-default text_color_error">
            {error}
          </p>
        )}
        {success && (
          <p className="text text_type_main-default text_color_success">
            Ссылка для восстановления пароля отправлена!
          </p>
        )}
        <div className={style.block}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-8"
            disabled={loading}
          >
            Восстановить
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-default ${style.text}`}>
        Вспомнили пароль?
        <Link to="/login" className={style.btn}>
          {' '}
          Войти
        </Link>
      </p>
    </div>
  );
};
