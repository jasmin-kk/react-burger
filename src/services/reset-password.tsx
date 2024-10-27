import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL, checkResponse } from '../utils/api';

export const forgotPassword = createAsyncThunk(
  'password/forgot',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return checkResponse(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  'password/reset',
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });
      return checkResponse(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

interface PasswordState {
  loading: boolean;
  success: boolean | null;
  error: string | null;
}

const initialState: PasswordState = {
  loading: false,
  success: null,
  error: null,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = action.payload.success;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default passwordSlice.reducer;
