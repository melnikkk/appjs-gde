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
    setNextEventIndex: (state) => {
      state.currentEventIndex += 1;
    },
    setPreviousEventIndex: (state) => {
      state.currentEventIndex = Math.max(0, state.currentEventIndex - 1);
    },
    setCurrentEventIndex: (state, action: PayloadAction<number>) => {
      state.currentEventIndex = action.payload;
      state.currentEventId = state.eventsCache[action.payload] || null;
    },
    setCurrentEventId: (state, action: PayloadAction<string>) => {
      state.currentEventId = action.payload;
    },
    cacheEvents: (state, action: PayloadAction<Array<RecordingEvent>>) => {
      const sortedEvents = [...action.payload].sort((a, b) => a.timestamp - b.timestamp);

      state.eventsCache = sortedEvents.reduce<Record<number, string>>((cache, event) => {
        cache[event.index] = event.id;

        return cache;
      }, {});

      state.sortedEventIds = sortedEvents.map((event) => event.id);
    },
  },
});

export const {
  setNextEventIndex,
  setPreviousEventIndex,
  setCurrentEventIndex,
  setCurrentEventId,
  cacheEvents,
} = recordingEventsSlice.actions;

export default recordingEventsSlice.reducer;
