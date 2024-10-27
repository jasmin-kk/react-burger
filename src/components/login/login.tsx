import React, { FC } from 'react';
import style from './login.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Login: FC = () => {
  const [email, setEmail] = React.useState('');
  const emailRef = React.useRef(null);
  const [pass, setPass] = React.useState('');
  const onChange = (e: any) => {
    setPass(e.target.value);
  };
  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Вход</h1>
      <Input
        type={'text'}
        placeholder={'E-mail'}
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
        <PasswordInput
          onChange={onChange}
          value={pass}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`mb-8 ${style.width}`}
        >
          Войти
        </Button>
        <p className={`text text_type_main-default mb-4 ${style.text}`}>
          Вы — новый пользователь?
          <a className={style.btn}> Зарегистрироваться</a>
        </p>
        <p className={`text text_type_main-default mb-4 ${style.text}`}>
          Забыли пароль?
          <a className={style.btn}> Восстановить пароль</a>
        </p>
      </div>
    </div>
  );
};
