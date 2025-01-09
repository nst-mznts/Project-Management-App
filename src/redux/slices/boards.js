import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const { data } = await axios.get('/boards', config);
    return data;
});

export const fetchRemoveBoard = createAsyncThunk('boards/fetchRemoveBoard', async (id) =>
    axios.delete(`/boards/${id}`),
);

const initialState = {
    boards: {
        items: [],
        status: 'loading',
    },
    columnIds: {
        items: [],
        status: 'loading',
    },
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBoards.pending, (state) => {
            state.boards.items = [];
            state.boards.status = 'loading';
        }),
        builder.addCase(fetchBoards.fulfilled, (state, action) => {
            state.boards.items = action.payload;
            state.boards.status = 'loaded';
        }),
        builder.addCase(fetchBoards.rejected, (state) => {
            state.boards.items = [];
            state.boards.status = 'error';
        }),
        builder.addCase(fetchRemoveBoard.pending, (state, action) => {
            state.boards.items = state.boards.items.filter((obj) => obj._id !== action.meta.arg);
        })
    },
});

export const boardsReducer = boardsSlice.reducer;