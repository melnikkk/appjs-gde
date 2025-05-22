import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { formatDuration } from '@/app/shared/utils';

interface Props {
  recordingEventId: string;
  recordingEventTimestamp: number;
  position: number;
  startPointTimestamp: number;
}

export const RecordingTimelineTrackerEvent: React.FC<Props> = ({
  recordingEventId,
  recordingEventTimestamp,
  position,
  startPointTimestamp,
}) => {
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);

  const isActive = recordingEventId === currentEventId;
  const eventTime = formatDuration(recordingEventTimestamp - startPointTimestamp);

  const onClick = useCallback(() => {
    dispatch(setCurrentEventId(recordingEventId));
  }, [dispatch, recordingEventId]);

  return (
    <div className="absolute" style={{ left: `${position}%` }}>
      <div
        className={cn(
          'absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/4 cursor-pointer rounded-full transition-all duration-150',
          isActive
            ? 'bg-primary ring-primary/30 scale-110 ring-2'
            : 'bg-black hover:scale-105 hover:bg-gray-800',
        )}
        onClick={onClick}
      />

      <div className="text-muted-foreground absolute top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
        {eventTime}
      </div>
    </div>
  );
};
