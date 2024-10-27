import React, { FC } from 'react';
import { ResetPassword } from '../components/reset-password/reset-password';
import { AppHeader } from '../components/app-header/app-header';

export const ResetPasswordPage: FC = () => {
  return (
    <>
      <AppHeader /> <ResetPassword />
    </>
  );
};
