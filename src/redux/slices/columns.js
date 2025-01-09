import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchColumns = createAsyncThunk('boards/fetchColumns', async (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const { data } = await axios.get(`/boards/${id}/columns`, config);
    return data;
});

export const fetchRemoveColumn = createAsyncThunk('boards/fetchRemoveColumn', async ({boardId, columnId}, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/boards/${boardId}/columns/${columnId}`);
        return { columnId, ...data };
    } catch (error) {
            return rejectWithValue(error.response.data);
        }
});

const initialState = {
    columns: {
        items: [],
        status: 'loading',
    },
};

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchColumns.pending, (state) => {
            state.columns.items = [];
            state.columns.status = 'loading';
        }),
        builder.addCase(fetchColumns.fulfilled, (state, action) => {
            state.columns.items = action.payload;
            state.columns.status = 'loaded';
        }),
        builder.addCase(fetchColumns.rejected, (state) => {
            state.columns.items = [];
            state.columns.status = 'error';
        }),
        builder.addCase(fetchRemoveColumn.pending, (state, action) => {
            state.columns.items = state.columns.items.filter(column => column._id !== action.meta.arg.columnId);
        })
    },
});

export const columnsReducer = columnsSlice.reducer;