import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../store';
import { registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import style from './register.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      registerUser({ email, password: pass, name })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <form className={style.main} onSubmit={handleRegister}>
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
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={`mb-8 ${style.width}`}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};
