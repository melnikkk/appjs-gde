import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordingEventsState } from '@/entities/recordingEvent/model/types';

const initialState: RecordingEventsState = {
  currentEventId: null,
};

export const recordingEventsSlice = createSlice({
  name: 'recordingEvents',
  initialState,
  reducers: {
    setCurrentEventId: (state, { payload }: PayloadAction<string | null>) => {
      state.currentEventId = payload;
    },
  },
});

export const { setCurrentEventId } = recordingEventsSlice.actions;

export default recordingEventsSlice.reducer;
