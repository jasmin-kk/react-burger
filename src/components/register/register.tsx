import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import style from './register.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch } from '../../store';

export const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = await dispatch(
      registerUser({ email, password: pass, name })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
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
        size={'default'}
        extraClass="ml-1 mb-6"
      />
      <PasswordInput
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        name={'password'}
        extraClass="mb-6"
      />
      <Button
        onClick={handleRegister}
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={`mb-8 ${style.width}`}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};
