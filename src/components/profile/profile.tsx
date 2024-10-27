import React, { FC } from 'react';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css';

export const Profile: FC = () => {
  const [name, setName] = React.useState('');
  const nameRef = React.useRef(null);
  const [login, setLogin] = React.useState('');
  const loginRef = React.useRef(null);
  const [pass, setPass] = React.useState('');
  const onChange = (e: any) => {
    setPass(e.target.value);
  };
  return (
    <div className={style.main}>
      <div className={style.menu}>
        <a className={`text text_type_main-medium ${style.nav}`}>Профиль</a>
        <a className="text text_type_main-medium text_color_inactive">
          История заказов
        </a>
        <a className="text text_type_main-medium text_color_inactive">Выход</a>
      </div>
      <div className={style.inputs}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
          icon={'EditIcon'}
          value={name}
          name={'name'}
          error={false}
          ref={nameRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setLogin(e.target.value)}
          icon={'EditIcon'}
          value={login}
          name={'name'}
          error={false}
          ref={loginRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <PasswordInput
          onChange={onChange}
          value={pass}
          name={'password'}
          icon="EditIcon"
        />
      </div>
    </div>
  );
};
