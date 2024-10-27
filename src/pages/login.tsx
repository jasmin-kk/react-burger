import React, { FC } from 'react';
import { Login } from '../components/login/login';
import { AppHeader } from '../components/app-header/app-header';

export const LoginPage: FC = () => {
  return (
    <>
      <AppHeader /> <Login />
    </>
  );
};
