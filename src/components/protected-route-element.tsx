import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { refreshToken, fetchUserData } from '../services/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  unknown?: boolean;
  isProtected?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  unknown = false,
  isProtected = false,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.authSlice.user);
  const accessToken = localStorage.getItem('accessToken');
  const refreshTokenValue = localStorage.getItem('refreshToken');

  const [isChecking, setIsChecking] = useState(true);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const isAuthenticated = !!user || !!accessToken;

  const from = location.state?.from || '/';

  useEffect(() => {
    const checkToken = async () => {
      setIsChecking(true);

      if (accessToken) {
        const response = await dispatch(fetchUserData());

        if (response.meta.requestStatus === 'rejected') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setRedirectToHome(true);
        }
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
      }

      setIsChecking(false);
    };

    checkToken();
  }, [accessToken, dispatch, refreshTokenValue]);

  if (isChecking) {
    return null;
  }

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  if (unknown && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  if (!unknown && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
