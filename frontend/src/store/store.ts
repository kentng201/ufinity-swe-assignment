import { configureStore } from '@reduxjs/toolkit';
import { schoolApi } from './api/schoolApi';

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath]: schoolApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(schoolApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
