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

export const selectSortedEventIds = createSelector(
  selectRecordingEventsState,
  (state) => state.sortedEventIds,
);

export const selectEventsAmount = createSelector(
  selectSortedEventIds,
  (events) => events.length,
);

export const selectRecordingEventsEntities = createSelector(
  selectRecordingEventsState,
  (state) => state.entities,
);

export const selectRecordingEventById = (eventId: string) =>
  createSelector(selectRecordingEventsEntities, (entities) =>
    eventId ? entities[eventId] : null,
  );

export const selectCurrentEvent = createSelector(
  selectRecordingEventsEntities,
  selectCurrentEventId,
  (entities, eventId) => (eventId ? entities[eventId] : null),
);

export const selectDoesRecordingEventExist = (eventId: string | undefined) =>
  createSelector(selectRecordingEventsEntities, (entities) =>
    eventId ? Boolean(entities[eventId]) : false,
  );
