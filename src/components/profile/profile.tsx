import React, { FC } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css';

export const Profile: FC = () => {
  const [name, setName] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [isNameFocused, setIsNameFocused] = React.useState(false);
  const [isLoginFocused, setIsLoginFocused] = React.useState(false);
  const [isPassFocused, setIsPassFocused] = React.useState(false);

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          icon={isNameFocused ? 'CloseIcon' : 'EditIcon'}
          value={name}
          name={'name'}
          error={false}
          onFocus={() => handleFocus(setIsNameFocused)}
          onBlur={() => handleBlur(setIsNameFocused)}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'text'}
          placeholder={'Email'}
          onChange={(e) => setLogin(e.target.value)}
          icon={isLoginFocused ? 'CloseIcon' : 'EditIcon'}
          value={login}
          name={'email'}
          error={false}
          onFocus={() => handleFocus(setIsLoginFocused)}
          onBlur={() => handleBlur(setIsLoginFocused)}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChangePass}
          icon={isPassFocused ? 'CloseIcon' : 'EditIcon'}
          value={pass}
          name={'password'}
          error={false}
          onFocus={() => handleFocus(setIsPassFocused)}
          onBlur={() => handleBlur(setIsPassFocused)}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        {(isPassFocused || isLoginFocused || isNameFocused) && (
          <div className={style.btns}>
            <Button htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
