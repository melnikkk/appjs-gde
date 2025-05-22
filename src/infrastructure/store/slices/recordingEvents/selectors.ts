import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const selectRecordingEventsState = (state: RootState) => state.recordingEvents;

export const selectCurrentEventIndex = createSelector(
  selectRecordingEventsState,
  (state) => state.currentEventIndex,
);

export const selectCurrentEventId = createSelector(
  selectRecordingEventsState,
  (state) => state.currentEventId,
);

export const selectEventsCache = createSelector(
  selectRecordingEventsState,
  (state) => state.eventsCache,
);

export const selectSortedEventIds = createSelector(
  selectRecordingEventsState,
  (state) => state.sortedEventIds,
);

export const selectEventsAmount = createSelector(
  selectSortedEventIds,
  (events) => events.length,
);
