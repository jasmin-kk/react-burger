import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { refreshToken, fetchUserData } from '../services/auth';

interface ProtectedRouteElementProps {
  children: ReactNode;
  isProtected?: boolean;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  children,
  isProtected = false,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.authSlice.user);
  const accessToken = localStorage.getItem('accessToken');
  const refreshTokenValue = localStorage.getItem('refreshToken');
  const hasRequestedPasswordReset = useSelector(
    (state: RootState) => state.authSlice.hasRequestedPasswordReset
  );

  const [isChecking, setIsChecking] = useState(true);
  const [redirectToHome, setRedirectToHome] = useState(false);

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
    navigate('/', { replace: true });
    return null;
  }

  if (isProtected && !isAuthenticated) {
    localStorage.setItem('redirectPath', location.pathname);
    navigate('/login', { replace: true });
    return null;
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
    navigate('/', { replace: true });
    return null;
  }

  if (location.pathname === '/reset-password' && !hasRequestedPasswordReset) {
    navigate('/forgot-password', { replace: true });
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
