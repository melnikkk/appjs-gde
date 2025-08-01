import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordingsState } from '@/entities/recording/model/types';

const initialState: RecordingsState = {
  currentRecordingId: null,
};

export const recordingsSlice = createSlice({
  name: 'recordings',
  initialState,
  reducers: {
    setCurrentRecordingId: (state, action: PayloadAction<string | null>) => {
      state.currentRecordingId = action.payload;
    },
  },
});

export const { setCurrentRecordingId } = recordingsSlice.actions;

export default recordingsSlice.reducer;
