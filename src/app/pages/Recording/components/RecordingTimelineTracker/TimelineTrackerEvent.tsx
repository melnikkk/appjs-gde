import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { formatDuration } from '@/app/shared/utils';
import {
  setRecordingPauseTimestamp,
  setSelectedTrackerEvent,
} from '@/infrastructure/store/slices/editor/slice';
import { TrackerEvent } from '@/infrastructure/store/slices/editor/types';

interface Props {
  isNewEvent?: boolean;
  startPointTimestamp: number;
  trackerEvent: TrackerEvent;
}

export const TimelineTrackerEvent: React.FC<Props> = ({
  isNewEvent,
  startPointTimestamp,
  trackerEvent,
}) => {
  const {
    id: recordingEventId,
    timestamp: recordingEventTimestamp,
    trackerPosition,
    coordinates,
    type,
  } = trackerEvent;

  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);

  const isActive = trackerEvent.id === currentEventId;
  const pauseTimestamp = recordingEventTimestamp - startPointTimestamp;
  const eventTime = formatDuration(pauseTimestamp);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      dispatch(setCurrentEventId(recordingEventId));
      dispatch(
        setSelectedTrackerEvent({
          id: recordingEventId,
          timestamp: recordingEventTimestamp,
          coordinates,
          trackerPosition,
          type,
        }),
      );
      dispatch(setRecordingPauseTimestamp(pauseTimestamp));
    },
    [dispatch, recordingEventId, trackerEvent],
  );

  return (
    <div className="absolute" style={{ left: `${trackerPosition}%` }}>
      <div
        className={cn(
          'absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/4 cursor-pointer rounded-full transition-all duration-150',
          isActive
            ? 'ring-primary/30 scale-110 ring-2'
            : 'hover:scale-105 hover:bg-gray-800',
          isNewEvent ? 'bg-secondary' : 'bg-primary',
        )}
        onClick={onClick}
      />

      <div className="text-muted-foreground absolute top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
        {eventTime}
      </div>
    </div>
  );
};
