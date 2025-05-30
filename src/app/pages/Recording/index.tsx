import { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import {
  setCurrentEventId,
  setRecordingEvents,
} from '@/infrastructure/store/slices/recordingEvents/slice';
import {
  selectCurrentEventId,
  selectEventsAmount,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Separator } from '@/components/ui/separator';
import { RecordingTimeline } from './components/RecordingTimeline';
import { RecordingTimelineNavigation } from './components/RecordingTimelineNavigation';
import { RecordingPlayer } from './RecordingPlayer';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const sortedEventsIds = useAppSelector(selectSortedEventIds);

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
      dispatch(setRecordingEvents(recording.events));
    }
  }, [recording, dispatch, eventsAmount]);

  useEffect(() => {
    if (recording && !currentEventId && eventsAmount > 0) {
      dispatch(setCurrentEventId(sortedEventsIds[0]));
    }
  }, [recording, dispatch, currentEventId, sortedEventsIds, eventsAmount]);

  if (!recording) {
    return null;
  }

  return (
    <>
      <div className="rounded-lg border p-4">
        <RecordingPlayer recording={recording} />

        <Separator className="my-4" />

        <RecordingTimelineNavigation
          recordingEvents={recording.events}
          startPointTimestamp={recording.startTime}
          endPointTimestamp={recording.stopTime}
          duration={recording.duration}
        />
      </div>

      <RecordingTimeline
        recording={recording}
        recordingEvents={recording.events}
        startPointTimestamp={recording.startTime}
      />
    </>
  );
};
