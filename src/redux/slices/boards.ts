import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Board } from '../../utils/types/BasicTypes.types';

export interface BoardsState {
  boards: {
    items: Board[];
    status: 'loading' | 'loaded' | 'error';
  };
}

export const fetchBoards = createAsyncThunk<Board[]>('boards/fetchBoards', async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<Board[]>('/boards', config);
  return data;
});

const initialState: BoardsState = {
  boards: {
    items: [],
    status: 'loading',
  },
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
