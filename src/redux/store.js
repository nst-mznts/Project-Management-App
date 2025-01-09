import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './slices/boards';
import { authReducer } from './slices/auth';
import { columnsReducer } from './slices/columns';
import { notesReducer } from './slices/notes';

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        auth: authReducer,
        columns: columnsReducer,
        notes: notesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Игнорируем action fetchRemoveBoard.fulfilled
            ignoredActions: ['boards/fetchRemoveBoard/fulfilled'],
            // Игнорируем поле headers в payload
            ignoredActionPaths: ['payload.headers', 'payload.config', 'payload.request'],
          },
        }),
});

export default store;