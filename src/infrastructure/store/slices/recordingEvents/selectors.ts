import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { recordingEventsApiSlice } from '@/infrastructure/store/slices/recordingEvents/api';
import { selectCurrentRecordingId } from '@/infrastructure/store/slices/recordings/selectors';
import { GetRecordingEventsResponse } from '@/infrastructure/store/slices/recordingEvents/types';

const selectRecordingEventsState = (state: RootState) => state.recordingEvents;

export const selectRecordingEventsFromCache = createSelector(
  (state: RootState) => state,
  selectCurrentRecordingId,
  (state, recordingId): GetRecordingEventsResponse => {
    if (!recordingId) {
      return { entities: {}, sortedEventIds: [] };
    }

    const queryResult = recordingEventsApiSlice.endpoints.getEvents.select({
      recordingId,
    })(state);

    return queryResult.data ?? { entities: {}, sortedEventIds: [] };
  },
);

export const selectCurrentEventIndex = createSelector(
  selectRecordingEventsState,
  (state) => state.currentEventIndex,
);

export const selectCurrentEventId = createSelector(
  selectRecordingEventsState,
  (state) => state.currentEventId,
);

export const selectRecordingEventsEntities = createSelector(
  selectRecordingEventsFromCache,
  (cachedRecordingEvents) => cachedRecordingEvents.entities ?? {},
);

export const selectSortedEventIds = createSelector(
  selectRecordingEventsFromCache,
  (cachedRecordingEvents) => cachedRecordingEvents.sortedEventIds ?? [],
);

export const selectEventsAmount = createSelector(
  selectSortedEventIds,
  (events) => events.length,
);

export const selectCurrentEvent = createSelector(
  selectRecordingEventsEntities,
  selectCurrentEventId,
  (entities, eventId) => (eventId ? entities[eventId] : null),
);

export const selectDoesRecordingEventExist = (eventId: string | undefined | null) =>
  createSelector(selectRecordingEventsEntities, (entities) =>
    eventId ? Boolean(entities[eventId]) : false,
  );
