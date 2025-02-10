import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Column } from '../../utils/types/BasicTypes.types';

export interface ColumnsState {
  columns: {
    items: Column[];
    status: 'loading' | 'loaded' | 'error';
  };
}

interface UpdateColumnOrderPayload {
  boardId: string;
  columns: Column[];
}

export const fetchColumns = createAsyncThunk<Column[], string>(
  'boards/fetchColumns',
  async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get<Column[]>(`/boards/${id}/columns`, config);
    return data;
  }
);

export const updateColumnOrder = createAsyncThunk<Column[], UpdateColumnOrderPayload>(
  'columns/updateOrder',
  async ({ boardId, columns }, { rejectWithValue }) => {
    try {
      await axios.patch(`/boards/${boardId}/columns/order`, columns);
      return columns;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: ColumnsState = {
  columns: {
    items: [],
    status: 'loading',
  },
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      builder.addCase(updateColumnOrder.fulfilled, (state, action) => {
        state.columns.items = action.payload;
        state.columns.status = 'loaded';
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
