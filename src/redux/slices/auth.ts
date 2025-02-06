import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/signup', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            console.log('deleteUser', userId);
            const response = await axios.delete(`/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        }),
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;;
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
            state.data = action.payload;;
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
            state.data = action.payload;;
        }),
        builder.addCase(fetchRegister.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        }),
        builder.addCase(deleteUser.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.status = "loaded";
            state.data = null;
        }),
        builder.addCase(deleteUser.rejected, (state) => {
            state.status = "error";
            state.data = null;
        });
    },
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const userName = state => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;