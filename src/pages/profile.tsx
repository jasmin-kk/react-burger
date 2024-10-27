import React, { FC } from 'react';
import { Profile } from '../components/profile/profile';
import { AppHeader } from '../components/app-header/app-header';

export const ProfilePage: FC = () => {
  return (
    <>
      <AppHeader /> <Profile />
    </>
  );
};
