import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { RecordingEventsState } from '@/infrastructure/store/slices/recordingEvents/types';

const initialState: RecordingEventsState = {
  currentEventIndex: 0,
  currentEventId: null,
  entities: {},
  sortedEventIds: [],
};

export const recordingEventsSlice = createSlice({
  name: 'recordingEvents',
  initialState,
  reducers: {
    setCurrentEventIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentEventIndex = payload;
      state.currentEventId = state.sortedEventIds[payload] || null;
    },
    setCurrentEventId: (state, { payload }: PayloadAction<string | null>) => {
      state.currentEventId = payload;
    },
    setRecordingEvents: (state, { payload }: PayloadAction<RecordingEvents>) => {
      const sortedEvents = Object.values(payload).sort(
        (a, b) => a.timestamp - b.timestamp,
      );

      state.sortedEventIds = sortedEvents.map((event) => event.id);
      state.entities = payload;
    },
  },
});

export const { setCurrentEventIndex, setCurrentEventId, setRecordingEvents } =
  recordingEventsSlice.actions;

export default recordingEventsSlice.reducer;
