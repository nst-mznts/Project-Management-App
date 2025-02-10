import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Task } from '../../utils/types/BasicTypes.types';

export interface TasksState {
  tasks: {
    items: Task[];
    status: 'loading' | 'loaded' | 'error';
  };
}

interface UpdateTaskOrderPayload {
  boardId: string;
  tasks: Task[];
}

export const fetchTask = createAsyncThunk<Task[], string>('boards/fetchTask', async (boardId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get<Task[]>(`/boards/${boardId}/tasks`, config);
  return data;
});

export const updateTaskOrder = createAsyncThunk<Task[], UpdateTaskOrderPayload>(
  'tasks/updateOrder',
  async ({ boardId, tasks }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.patch(`/boards/${boardId}/tasks/order`, tasks, config);
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: TasksState = {
  tasks: {
    items: [],
    status: 'loading',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTask.pending, (state) => {
      state.tasks.items = [];
      state.tasks.status = 'loading';
    }),
      builder.addCase(fetchTask.fulfilled, (state, action) => {
        state.tasks.items = action.payload;
        state.tasks.status = 'loaded';
      }),
      builder.addCase(fetchTask.rejected, (state) => {
        state.tasks.items = [];
        state.tasks.status = 'error';
      }),
      builder.addCase(updateTaskOrder.fulfilled, (state, action) => {
        state.tasks.items = action.payload;
        state.tasks.status = 'loaded';
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
