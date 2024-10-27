import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../services/ingredients';
import { AppDispatch } from '../store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home-page/home';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { IngredientDetailsPage } from '../pages/ingredient-details';
import { RegisterPage } from '../pages/register';
import { LoginPage } from '../pages/login';
import { ResetPasswordPage } from '../pages/reset-password';
import { ProfilePage } from '../pages/profile';

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
      </Routes>
    </Router>
  );
};
