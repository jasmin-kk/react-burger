import React, { FC } from 'react';
import { Register } from '../components/register/register';
import { AppHeader } from '../components/app-header/app-header';

export const RegisterPage: FC = () => {
  return (
    <>
      <AppHeader /> <Register />
    </>
  );
};
