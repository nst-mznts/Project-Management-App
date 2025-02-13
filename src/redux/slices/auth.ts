import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { User } from '../../utils/types/BasicTypes.types';
import { AuthFormValues } from '../../utils/types/AuthForm.types';

interface AuthState {
  data: User | null;
  status: 'loading' | 'loaded' | 'error';
}

export const fetchAuth = createAsyncThunk<User, AuthFormValues>('auth/fetchAuth', async (params) => {
  const { data } = await axios.post<User>('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk<User, AuthFormValues>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post<User>('/auth/signup', params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
});

export const deleteUser = createAsyncThunk<void, string>(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('deleteUser', userId);
      const response = await axios.delete(`/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: AuthState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    }),
      builder.addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      }),
      builder.addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      }),
      builder.addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      }),
      builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      }),
      builder.addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      }),
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      }),
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      }),
      builder.addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      }),
      builder.addCase(deleteUser.fulfilled, (state) => {
        state.status = 'loaded';
        state.data = null;
      }),
      builder.addCase(deleteUser.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const userName = (state: RootState): User | null => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
