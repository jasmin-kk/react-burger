import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  registerUser,
  loginUser,
  refreshToken,
  fetchUserData,
  updateUserData,
  clearAuthState,
  setHasRequestedPasswordReset,
} from './auth';

describe('authSlice', () => {
  const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    hasRequestedPasswordReset: false,
  };

  const store = configureStore({
    reducer: { auth: authReducer },
  });

  it('should have initial state', () => {
    const state = store.getState().auth;
    expect(state).toEqual(initialState);
  });

  it('should handle clearAuthState', () => {
    store.dispatch(clearAuthState());
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.hasRequestedPasswordReset).toBe(false);
  });

  it('should handle setHasRequestedPasswordReset', () => {
    store.dispatch(setHasRequestedPasswordReset(true));
    const state = store.getState().auth;
    expect(state.hasRequestedPasswordReset).toBe(true);
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken',
      },
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.user).toEqual(action.payload.user);
    expect(state.accessToken).toBe(action.payload.accessToken);
    expect(state.refreshToken).toBe(action.payload.refreshToken);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken',
      },
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.user).toEqual(action.payload.user);
    expect(state.accessToken).toBe(action.payload.accessToken);
    expect(state.refreshToken).toBe(action.payload.refreshToken);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Invalid credentials',
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBe(false);
  });

  it('should handle refreshToken.fulfilled', () => {
    const action = {
      type: refreshToken.fulfilled.type,
      payload: { accessToken: 'newAccessToken' },
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.accessToken).toBe('newAccessToken');
  });

  it('should handle fetchUserData.fulfilled', () => {
    const action = {
      type: fetchUserData.fulfilled.type,
      payload: { user: { email: 'test@example.com', name: 'Test User' } },
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.user).toEqual(action.payload.user);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should handle fetchUserData.rejected', () => {
    const action = {
      type: fetchUserData.rejected.type,
      payload: 'Error fetching user data',
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.error).toBe('Error fetching user data');
    expect(state.loading).toBe(false);
  });

  it('should handle updateUserData.fulfilled', () => {
    const action = {
      type: updateUserData.fulfilled.type,
      payload: {
        user: { email: 'newemail@example.com', name: 'Updated User' },
      },
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.user).toEqual(action.payload.user);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should handle updateUserData.rejected', () => {
    const action = {
      type: updateUserData.rejected.type,
      payload: 'Error updating user data',
    };

    store.dispatch(action);
    const state = store.getState().auth;
    expect(state.error).toBe('Error updating user data');
    expect(state.loading).toBe(false);
  });
});
