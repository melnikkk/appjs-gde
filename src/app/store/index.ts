import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '@/shared/api';
import { recordingEventsSlice } from '../../entities/recordingEvent/model/slice';
import { editorSlice } from '@/entities/editor/model/slice';
import { recordingsSlice } from '@/entities/recording/model/slice';

const rootReducer = combineReducers({
  [recordingEventsSlice.name]: recordingEventsSlice.reducer,
  [editorSlice.name]: editorSlice.reducer,
  [recordingsSlice.name]: recordingsSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const setupStore = (preloadedState?: Partial<RootState>) => {
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
