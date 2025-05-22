import { useCallback, useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import {
  setCurrentEventId,
  cacheEvents,
} from '@/infrastructure/store/slices/recordingEvents/slice';
import {
  selectCurrentEventId,
  selectEventsAmount,
  selectEventsCache,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Separator } from '@/components/ui/separator';
import { RecordingTimeline } from './components/RecordingTimeline';
import { AddEventDialog } from './components/AddEventDialog';
import { RecordingTimelineNavigation } from './components/RecordingTimelineNavigation';
import { RecordingPlayer } from './RecordingPlayer';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);

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

  const handleResize = useCallback((newDimensions: { width: number; height: number }) => {
    setDimensions(newDimensions);
  }, []);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    if (recording && recording.events) {
      dispatch(cacheEvents(Object.values(recording.events)));
    }
  }, [recording, dispatch, eventsAmount]);

  useEffect(() => {
    if (recording && !currentEventId && eventsAmount > 0) {
      dispatch(setCurrentEventId(eventsCache[0]));
    }
  }, [recording, dispatch, currentEventId, eventsCache, eventsAmount]);

  if (!recording) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg border p-4">
        <div className="relative">
          <RecordingPlayer
            recording={recording}
            onResize={handleResize}
            onTimeUpdate={handleTimeUpdate}
          />
          <RecordingEventsPresenter recording={recording} dimensions={dimensions} />
        </div>

        <Separator className="my-4" />

        <RecordingTimelineNavigation
          recordingEvents={recording.events}
          startPointTimestamp={recording.startTime}
          endPointTimestamp={recording.stopTime}
          duration={recording.duration}
          currentTime={currentTime}
        />

        <div className="mt-3 flex items-center justify-end">
          <AddEventDialog currentTime={currentTime} />
        </div>
      </div>
      <RecordingTimeline
        recordingEvents={recording.events}
        startPointTimestamp={recording.startTime}
      />
    </>
  );
};
