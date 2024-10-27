import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './forgot-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/reset-password';
import { AppDispatch, RootState } from '../../store';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = React.useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.passwordSlice
  );

  const handleSubmit = () => {
    dispatch(resetPassword(email)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/reset-password');
      }
    });
  };

  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>
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
        <p className="text text_type_main-default text_color_error">{error}</p>
      )}
      {success && (
        <p className="text text_type_main-default text_color_success">
          Ссылка для восстановления пароля отправлена!
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-8"
          onClick={handleSubmit}
          disabled={loading}
        >
          Восстановить
        </Button>
        <p className={`text text_type_main-default ${style.text}`}>
          Вспомнили пароль?
          <Link to="/login" className={style.btn}>
            {' '}
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
