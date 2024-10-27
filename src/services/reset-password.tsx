import { BASE_URL, checkResponse } from '../utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const ResetPassword = async (email: string) => {
  const response = await fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return checkResponse(response);
};

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

export const resetPassword = createAsyncThunk(
  'password/reset',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await ResetPassword(email);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default passwordSlice.reducer;
