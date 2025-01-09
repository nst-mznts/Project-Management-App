import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchNotes = createAsyncThunk('boards/fetchNotes', async ({boardId, columnId}) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const { data } = await axios.get(`/boards/${boardId}/columns/${columnId}`, config);
    return data;
});

const initialState = {
    notes: {
        items: [],
        status: 'loading',
    },
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.notes.items = [];
            state.notes.status = 'loading';
        }),
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.notes.items = action.payload;
            state.notes.status = 'loaded';
        }),
        builder.addCase(fetchNotes.rejected, (state) => {
            state.notes.items = [];
            state.notes.status = 'error';
        })
    },
});

export const notesReducer = notesSlice.reducer;