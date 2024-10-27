import React, { FC } from 'react';
import style from './forgot-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = React.useState('');
  const emailRef = React.useRef(null);
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
        ref={emailRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1 mb-6"
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-8"
        >
          Восстановить
        </Button>
        <p className={`text text_type_main-default ${style.text}`}>
          Вспомнили пароль?
          <a className={style.btn}> Войти</a>
        </p>
      </div>
    </div>
  );
};
