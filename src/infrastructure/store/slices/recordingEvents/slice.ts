import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { EventsCache } from './types';

interface RecordingEventsState {
  currentEventIndex: number;
  currentEventId: string | null;
  sortedEventIds: Array<string>;
  eventsCache: EventsCache;
}

const initialState: RecordingEventsState = {
  currentEventIndex: 0,
  currentEventId: null,
  eventsCache: {},
  sortedEventIds: [],
};

export const recordingEventsSlice = createSlice({
  name: 'recordingEvents',
  initialState,
  reducers: {
    setCurrentEventIndex: (state, action: PayloadAction<number>) => {
      state.currentEventIndex = action.payload;
      state.currentEventId = state.sortedEventIds[action.payload] || null;
    },
    setCurrentEventId: (state, action: PayloadAction<string>) => {
      state.currentEventId = action.payload;
    },
    setSortedRecordingEventsIds: (
      state,
      action: PayloadAction<Array<RecordingEvent>>,
    ) => {
      const sortedEvents = [...action.payload].sort((a, b) => a.timestamp - b.timestamp);

      state.sortedEventIds = sortedEvents.map((event) => event.id);
    },
  },
});

export const { setCurrentEventIndex, setCurrentEventId, setSortedRecordingEventsIds } =
  recordingEventsSlice.actions;

export default recordingEventsSlice.reducer;
