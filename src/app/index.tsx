import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { fetchIngredients } from '../services/ingredients';
import { HomePage } from '../pages/home-page/home';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { IngredientDetailsPage } from '../pages/ingredient-details';
import { RegisterPage } from '../pages/register';
import { LoginPage } from '../pages/login';
import { ResetPasswordPage } from '../pages/reset-password';
import { ProfilePage } from '../pages/profile';
import ProtectedRouteElement from '../components/protected-route-element';
import { AppDispatch } from '../store';

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement>{<LoginPage />}</ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement>{<RegisterPage />}</ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement>
              {<ForgotPasswordPage />}
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement>
              {<ResetPasswordPage />}
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement isProtected>
              {<ProfilePage />}
            </ProtectedRouteElement>
          }
        />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
      </Routes>
    </Router>
  );
};
