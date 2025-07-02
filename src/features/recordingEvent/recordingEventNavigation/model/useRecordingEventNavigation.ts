import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectEventsAmount,
  selectTrackerEvents,
} from '@/entities/recordingEvent/model/selectors';
import { setCurrentEventId } from '@/entities/recordingEvent/model/slice';
import { setRecordingPauseTimestamp } from '@/entities/editor/model/slice';

export const useRecordingEventNavigation = (startPointTimestamp: number) => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const trackerEvents = useAppSelector(selectTrackerEvents);

  const navigateToPreviousEvent = useCallback(() => {
    if (eventsAmount <= 0) return;

    if (currentEventIndex === -1) {
      const lastEventIndex = eventsAmount - 1;
      const lastEvent = trackerEvents[lastEventIndex];
      const pauseTimestamp = lastEvent.timestamp - startPointTimestamp;

      dispatch(setCurrentEventId(lastEvent.id));
      dispatch(setRecordingPauseTimestamp(pauseTimestamp));

      return;
    }

    const previousEventIndex = (currentEventIndex - 1 + eventsAmount) % eventsAmount;
    const previousEvent = trackerEvents[previousEventIndex];
    const pauseTimestamp = previousEvent.timestamp - startPointTimestamp;

    dispatch(setCurrentEventId(previousEvent.id));
    dispatch(setRecordingPauseTimestamp(pauseTimestamp));
  }, [dispatch, currentEventIndex, eventsAmount, trackerEvents, startPointTimestamp]);

  const navigateToNextEvent = useCallback(() => {
    if (eventsAmount <= 0) return;

    if (currentEventIndex === -1) {
      const firstEvent = trackerEvents[0];
      const pauseTimestamp = firstEvent.timestamp - startPointTimestamp;

      dispatch(setCurrentEventId(firstEvent.id));
      dispatch(setRecordingPauseTimestamp(pauseTimestamp));

      return;
    }

    const nextEventIndex = (currentEventIndex + 1) % eventsAmount;
    const nextEvent = trackerEvents[nextEventIndex];
    const pauseTimestamp = nextEvent.timestamp - startPointTimestamp;

    dispatch(setCurrentEventId(nextEvent.id));
    dispatch(setRecordingPauseTimestamp(pauseTimestamp));
  }, [dispatch, currentEventIndex, eventsAmount, trackerEvents, startPointTimestamp]);

  return {
    navigateToPreviousEvent,
    navigateToNextEvent,
    hasEvents: eventsAmount > 0,
  };
};
