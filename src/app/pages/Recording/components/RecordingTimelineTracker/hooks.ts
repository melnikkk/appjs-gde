import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSortedEventIds } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { TrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/types';

interface Params {
  recordingEvents: RecordingEvents;
  startPointTimestamp: number;
  recordingDuration: number;
}

export const useTrackerEvents = ({
  recordingEvents,
  startPointTimestamp,
  recordingDuration,
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
      coordinates: event.data.coordinates,
      trackerPosition: Math.min(Math.max(trackerPosition, 0), 100),
      timestamp: event.timestamp,
    };
  });

  return { trackerEvents };
};
