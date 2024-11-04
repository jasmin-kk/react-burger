import React, { FC } from 'react';
import { ForgotPassword } from '../components/forgot-password/forgot-password';
import { AppHeader } from '../components/app-header/app-header';

export const ForgotPasswordPage: FC = () => {
  return (
    <>
      <AppHeader /> <ForgotPassword />
    </>
  );
};
