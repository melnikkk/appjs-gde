import { useMemo } from 'react';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSortedEventIds } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { RecordingTimelineTrackerEvent } from './RecordingTimelineTrackerEvent';
import { TimeMarker } from './TimeMarker';

interface Props {
  startPointTimestamp: number;
  recordingDuration: number;
  recordingEvents: RecordingEvents;
}

export const RecordingTimelineTracker: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
  recordingDuration,
}) => {
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const eventPositions = useMemo(() => {
    return sortedEventIds.map((eventId) => {
      const event = recordingEvents[eventId];

      if (!event) {
        return { id: eventId, position: 0 };
      }

      const position =
        ((event.timestamp - startPointTimestamp) / recordingDuration) * 100;

      return {
        id: eventId,
        position: Math.min(Math.max(position, 0), 100),
      };
    });
  }, [sortedEventIds, recordingEvents, startPointTimestamp, recordingDuration]);

  return (
    <div className="relative flex-1">
      <div className="relative mt-6 mb-4 h-2 w-full rounded-full bg-gray-300">
        <TimeMarker duration={0} />

        <TimeMarker className="right-0" duration={recordingDuration} />

        {eventPositions.map(({ id, position }) => {
          return (
            <RecordingTimelineTrackerEvent
              key={id}
              recordingEventId={id}
              position={position}
              recordingEventTimestamp={recordingEvents[id].timestamp}
              startPointTimestamp={startPointTimestamp}
            />
          );
        })}
      </div>
    </div>
  );
};
