import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './slices/boards';
import { authReducer } from './slices/auth';
import { columnsReducer } from './slices/columns';
import { tasksReducer } from './slices/tasks';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    auth: authReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['boards/fetchRemoveBoard/fulfilled'],
        ignoredActionPaths: ['payload.headers', 'payload.config', 'payload.request'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
