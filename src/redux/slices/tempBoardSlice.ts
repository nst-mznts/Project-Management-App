import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, Task } from '../../utils/types/BasicTypes.types';

interface TempBoardState {
  columns: Column[];
  tasks: Task[];
}

const initialState: TempBoardState = {
  columns: [],
  tasks: [],
};

const tempBoardSlice = createSlice({
  name: 'tempBoard',
  initialState,
  reducers: {
    setTempColumns(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    setTempTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    resetTempState(state) {
      state.columns = [];
      state.tasks = [];
    },
  },
});

export const { setTempColumns, setTempTasks, resetTempState } = tempBoardSlice.actions;
export default tempBoardSlice.reducer;
