import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { recordingEventsSlice } from './slices/recordingEvents/slice';
import { editorSlice } from '@/infrastructure/store/slices/editor/slice';

const rootReducer = combineReducers({
  [recordingEventsSlice.name]: recordingEventsSlice.reducer,
  [editorSlice.name]: editorSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
