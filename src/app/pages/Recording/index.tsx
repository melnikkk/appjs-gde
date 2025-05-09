import { useCallback, useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import {
  setNextEventIndex,
  setPreviousEventIndex,
  setCurrentEventId,
  cacheEvents,
} from '@/infrastructure/store/slices/editor/slice';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
  selectEventsAmount,
  selectEventsCache,
} from '@/infrastructure/store/slices/editor/selectors';
import { Button } from '@/components/ui/button';
import { RecordingPlayer } from './RecordingPlayer';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';
import { RecordingTimeline } from './components/RecordingTimeline';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const currentEventId = useAppSelector(selectCurrentEventId);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const eventsCache = useAppSelector(selectEventsCache);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { id } = useParams({ strict: false });

  const { data: recording } = useGetRecordingQuery(
    {
      id: id as string,
    },
    {
      skip: !id,
    },
  );

  useEffect(() => {
    if (recording && recording.events) {
      dispatch(cacheEvents(Object.values(recording.events)));
    }
  }, [recording, dispatch, eventsAmount]);

  const maxEventIndex = eventsAmount - 1 > 0 ? eventsAmount - 1 : 0;

  useEffect(() => {
    if (recording && !currentEventId && eventsAmount > 0) {
      dispatch(setCurrentEventId(eventsCache[0]));
    }
  }, [recording, dispatch, currentEventId, eventsCache, eventsAmount]);

  const isPreviousButtonDisabled = currentEventIndex === 0;

  const onPreviousClick = useCallback(() => {
    if (currentEventIndex > 0 && eventsAmount > 0) {
      const previousEventId = eventsCache[currentEventIndex - 1];

      if (previousEventId) {
        dispatch(setCurrentEventId(previousEventId));
        dispatch(setPreviousEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, eventsAmount, eventsCache]);

  const isNextButtonDisabled = currentEventIndex >= maxEventIndex;

  const onNextClick = useCallback(() => {
    if (currentEventIndex < maxEventIndex && eventsAmount > 0) {
      const nextEventId = eventsCache[currentEventIndex + 1];

      if (nextEventId) {
        dispatch(setCurrentEventId(nextEventId));
        dispatch(setNextEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, maxEventIndex, eventsCache, eventsAmount]);

  const handleResize = useCallback((newDimensions: { width: number; height: number }) => {
    setDimensions(newDimensions);
  }, []);

  if (!recording) {
    return null;
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <RecordingPlayer recording={recording} onResize={handleResize} />
        <RecordingEventsPresenter recording={recording} dimensions={dimensions} />
      </div>
      <div className="mt-4 flex space-x-2">
        <Button disabled={isPreviousButtonDisabled} onClick={onPreviousClick}>
          Previous
        </Button>
        <Button disabled={isNextButtonDisabled} onClick={onNextClick}>
          Next
        </Button>
      </div>
      <RecordingTimeline
        recordingEvents={recording.events}
        startPointTimestamp={recording.startTime}
      />
    </>
  );
};
