import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/selectors';
import {
  setCurrentEventId,
  setRecordingEventToAdd,
} from '@/infrastructure/store/slices/recordingEvents/slice';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { formatDuration } from '@/app/shared/utils';
import { setRecordingPauseTimestamp } from '@/infrastructure/store/slices/editor/slice';

interface Props {
  isNewEvent?: boolean;
  recordingEventId: string;
  recordingEventTimestamp: number;
  position: number;
  startPointTimestamp: number;
}

export const TimelineTrackerEvent: React.FC<Props> = ({
  isNewEvent,
  recordingEventId,
  recordingEventTimestamp,
  position,
  startPointTimestamp,
}) => {
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);

  const isActive = recordingEventId === currentEventId;
  const pauseTimestamp = recordingEventTimestamp - startPointTimestamp;
  const eventTime = formatDuration(pauseTimestamp);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      dispatch(setCurrentEventId(recordingEventId));
      dispatch(setRecordingEventToAdd(null));
      dispatch(setRecordingPauseTimestamp(pauseTimestamp));
    },
    [dispatch, recordingEventId],
  );

  return (
    <div className="absolute" style={{ left: `${position}%` }}>
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
