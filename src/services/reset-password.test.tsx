import { configureStore } from '@reduxjs/toolkit';
import passwordReducer, {
  forgotPassword,
  resetPassword,
} from './reset-password';

describe('passwordSlice', () => {
  const store = configureStore({
    reducer: { password: passwordReducer },
  });

  it('should have initial state', () => {
    const state = store.getState().password;
    expect(state).toEqual({
      loading: false,
      success: null,
      error: null,
    });
  });

  it('should handle forgotPassword.pending', () => {
    store.dispatch(forgotPassword.pending('', 'test@example.com'));

    const state = store.getState().password;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.success).toBeNull();
  });

  it('should handle forgotPassword.fulfilled', () => {
    const fulfilledAction = forgotPassword.fulfilled(
      { success: true },
      '',
      'test@example.com'
    );
    store.dispatch(fulfilledAction);

    const state = store.getState().password;
    expect(state.loading).toBe(false);
    expect(state.success).toBe(true);
  });

  it('should handle resetPassword.fulfilled', () => {
    const fulfilledAction = resetPassword.fulfilled({ success: true }, '', {
      password: 'newpass',
      token: '123',
    });
    store.dispatch(fulfilledAction);

    const state = store.getState().password;
    expect(state.loading).toBe(false);
    expect(state.success).toBe(true);
  });
});
