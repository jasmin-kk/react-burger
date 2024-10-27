import React, { FC } from 'react';
import style from './reset-password.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPassword: FC = () => {
  const [code, setCode] = React.useState('');
  const codeRef = React.useRef(null);
  const [pass, setPass] = React.useState('');
  const onChange = (e: any) => {
    setPass(e.target.value);
  };
  return (
    <div className={style.main}>
      <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PasswordInput
          onChange={onChange}
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
          ref={codeRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1 mb-6"
        />
        <Button
          htmlType="button"
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
    </div>
  );
};
