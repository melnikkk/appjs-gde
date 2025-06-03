import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSortedEventIds } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { TrackerEvents } from '@/infrastructure/store/slices/editor/types';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';
import { Dimensions } from '@/domain/Recordings';

interface Params {
  startPointTimestamp: number;
  recordingDuration: number;
  recordingEvents: RecordingEvents;
  recordingDimensions: Dimensions | null;
  initialRecordingDimensions: Dimensions;
}

export const useTrackerEvents = ({
  recordingEvents,
  startPointTimestamp,
  recordingDuration,
  recordingDimensions,
  initialRecordingDimensions,
}: Params): { trackerEvents: TrackerEvents } => {
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const trackerEvents = sortedEventIds.map((eventId) => {
    const event = recordingEvents[eventId];

    if (!event) {
      return {
        id: eventId,
        trackerPosition: 0,
        timestamp: 0,
        coordinates: { x: 0, y: 0 },
      };
    }

    const trackerPosition =
      ((event.timestamp - startPointTimestamp) / recordingDuration) * 100;

    return {
      id: eventId,
      coordinates: recordingDimensions
        ? scaleCoordinates(
            recordingDimensions,
            initialRecordingDimensions,
            event.data.coordinates,
          )
        : { x: 0, y: 0 },
      trackerPosition: Math.min(Math.max(trackerPosition, 0), 100),
      timestamp: event.timestamp,
    };
  });

  return { trackerEvents };
};
