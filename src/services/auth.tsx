import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const saveRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  hasRequestedPasswordReset: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  hasRequestedPasswordReset: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string; password: string; name: string }) => {
    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Ошибка входа');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (refreshToken: string) => {
    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/logout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      }
    );
    return response.json();
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (token: string) => {
    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      }
    );
    return response.json();
  }
);

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/user',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === 'jwt expired') {
        useNavigate()('/login');
      }
      return rejectWithValue(errorData.message || 'Ошибка получения данных');
    }

    return response.json();
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return rejectWithValue('Токен доступа отсутствует');
    }

    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/user',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue('Ошибка обновления данных');
    }

    return response.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      state.hasRequestedPasswordReset = false;
    },
    setHasRequestedPasswordReset: (state, action) => {
      state.hasRequestedPasswordReset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        saveRefreshToken(action.payload.refreshToken);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        saveRefreshToken(action.payload.refreshToken);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('refreshToken');
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthState, setHasRequestedPasswordReset } =
  authSlice.actions;

export default authSlice.reducer;
