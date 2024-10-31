import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { fetchIngredients } from '../services/ingredients';
import { HomePage } from '../pages/home-page/home';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { IngredientDetailsPage } from '../pages/ingredien-details/ingredient-details';
import { RegisterPage } from '../pages/register';
import { LoginPage } from '../pages/login';
import { ResetPasswordPage } from '../pages/reset-password';
import { ProfilePage } from '../pages/profile';
import ProtectedRouteElement from '../components/protected-route-element';
import { AppDispatch } from '../store';
import { IngredientDetails } from '../components/burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '../components/modal/modal';

export const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;
  const closeModal = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
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
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={'Детали ингридиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
