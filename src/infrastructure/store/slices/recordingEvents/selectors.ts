import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { recordingEventsApiSlice } from '@/infrastructure/store/slices/recordingEvents/api';
import {
  selectCurrentRecordingDuration,
  selectCurrentRecordingId,
  selectCurrentRecordingStartTimestamp,
} from '@/infrastructure/store/slices/recordings/selectors';
import { GetRecordingEventsResponse } from '@/infrastructure/store/slices/recordingEvents/types';
import { TrackerEvent, TrackerEvents } from '@/infrastructure/store/slices/editor/types';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';

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

export const selectDoesRecordingEventExist = (eventId: string | undefined | null) =>
  createSelector(selectRecordingEventsEntities, (entities) =>
    eventId ? Boolean(entities[eventId]) : false,
  );

export const selectTrackerEvents = createSelector(
  selectRecordingEventsEntities,
  selectSortedEventIds,
  selectCurrentRecordingStartTimestamp,
  selectCurrentRecordingDuration,
  (
    entities,
    sortedEventIds,
    recordingStartTimestamp,
    recordingDuration,
  ): TrackerEvents => {
    return sortedEventIds.map((eventId) => {
      const event = entities[eventId];

      if (!event || !recordingStartTimestamp || !recordingDuration) {
        return {
          id: eventId,
          trackerPosition: 0,
          timestamp: 0,
          type: RecordingEventType.CLICK,
        };
      }

      const trackerPosition =
        ((event.timestamp - recordingStartTimestamp) / recordingDuration) * 100;

      return {
        id: eventId,
        trackerPosition,
        timestamp: event.timestamp,
        type: event.type,
      };
    });
  },
);

export const selectCurrentTrackerEvent = createSelector(
  selectTrackerEvents,
  selectCurrentEventId,
  (trackerEvents, currentEventId): TrackerEvent | null =>
    trackerEvents.find((trackerEvent) => trackerEvent.id === currentEventId) || null,
);

export const selectCurrentEventIndex = createSelector(
  selectTrackerEvents,
  selectCurrentEventId,
  (trackerEvents, currentEventId): number =>
    trackerEvents.findIndex((trackerEvent) => trackerEvent.id === currentEventId),
);

export const selectCurrentEvent = createSelector(
  selectRecordingEventsEntities,
  selectCurrentEventId,
  (entities, eventId) => (eventId ? entities[eventId] : null),
);
