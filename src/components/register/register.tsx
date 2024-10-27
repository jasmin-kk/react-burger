import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';

export const Register: FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const [pass, setPass] = React.useState('');
  const onChange = (e: any) => {
    setPass(e.target.value);
  };
  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        ref={nameRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1 mb-6"
      />
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
          Зарегистрироваться
        </Button>
        <p className={`text text_type_main-default ${style.text}`}>
          Уже зарегистрированы?
          <Link to="/login" className={style.btn}>
            {' '}
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
