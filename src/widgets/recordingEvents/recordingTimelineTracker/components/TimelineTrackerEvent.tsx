import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/entities/recordingEvent/model/selectors';
import { setCurrentEventId } from '@/entities/recordingEvent/model/slice';
import { cn } from '@/shared/lib/styles-utils';
import { useCallback } from 'react';
import { formatDuration } from '@/shared/lib/time-utils';
import { setRecordingPauseTimestamp } from '@/entities/editor/model/slice';
import { TrackerEvent } from '@/entities/editor/model/types';

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
  } = trackerEvent;

  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);

  const isSelected = currentEventId === recordingEventId;

  const handleTrackerEventClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      const recordingPauseTimestamp = recordingEventTimestamp - startPointTimestamp;

      dispatch(setRecordingPauseTimestamp(recordingPauseTimestamp));
      dispatch(setCurrentEventId(recordingEventId));
    },
    [dispatch, recordingEventId, recordingEventTimestamp, startPointTimestamp],
  );

  const calculatedLeftPosition = `${trackerPosition}%`;

  return (
    <div
      onClick={handleTrackerEventClick}
      className={cn(
        'absolute -translate-x-1/2 -translate-y-1/4 transform cursor-pointer',
        isNewEvent ? 'z-20' : 'z-10',
      )}
      style={{ left: calculatedLeftPosition }}
    >
      <div className="absolute -top-7 -left-[50%] text-xs whitespace-nowrap text-gray-500">
        {formatDuration(recordingEventTimestamp - startPointTimestamp)}
      </div>
      <div
        className={cn(
          'h-4 w-4 rounded-full',
          isSelected ? 'bg-primary scale-110' : 'bg-primary/70 hover:scale-110',
          isNewEvent ? 'ring-primary/30 ring-2' : '',
        )}
        title={`Event at ${formatDuration(recordingEventTimestamp - startPointTimestamp)}`}
      />
    </div>
  );
};
