import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { refreshToken, fetchUserData } from '../services/auth';

interface ProtectedRouteElementProps {
  children: ReactNode;
  isProtected?: boolean;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  children,
  isProtected,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const accessToken = localStorage.getItem('accessToken');
  const refreshTokenValue = localStorage.getItem('refreshToken');
  const hasRequestedPasswordReset = useSelector(
    (state: RootState) => state.authSlice.hasRequestedPasswordReset
  );

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const isAuthenticated = !!user || !!accessToken;

  useEffect(() => {
    const checkToken = async () => {
      setIsChecking(true);

      if (accessToken) {
        const response = await dispatch(fetchUserData());

        if (response.meta.requestStatus === 'rejected') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setRedirectToHome(true);
          setIsChecking(false);

          return;
        }
      } else {
        setIsChecking(false);
        return;
      }

      if (refreshTokenValue) {
        const refreshResponse = await dispatch(refreshToken(refreshTokenValue));

        if (refreshResponse.meta.requestStatus === 'fulfilled') {
          await dispatch(fetchUserData());
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setRedirectToHome(true);
        }
      } else {
        return;
      }

      setIsChecking(false);
    };

    checkToken();
  }, [accessToken, dispatch, refreshTokenValue]);

  if (isChecking) {
    return null;
  }

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (
    !isAuthenticated &&
    ['/login', '/register', '/forgot-password', '/reset-password'].includes(
      window.location.pathname
    )
  ) {
    return <>{children}</>;
  }

  if (
    isAuthenticated &&
    ['/login', '/register', '/forgot-password', '/reset-password'].includes(
      window.location.pathname
    )
  ) {
    return <Navigate to="/" />;
  }

  if (
    window.location.pathname === '/reset-password' &&
    !hasRequestedPasswordReset
  ) {
    return <Navigate to="/forgot-password" />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
