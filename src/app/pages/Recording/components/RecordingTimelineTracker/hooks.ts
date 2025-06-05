import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSortedEventIds } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { TrackerEvents } from '@/infrastructure/store/slices/editor/types';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';
import { Dimensions } from '@/domain/Recordings';
import {
  DEFAULT_RECORDING_EVENT_COORDINATES,
  RecordingEventType,
} from '@/domain/RecordingEvents/constants';

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
        coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
        type: RecordingEventType.CLICK,
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
        : DEFAULT_RECORDING_EVENT_COORDINATES,
      trackerPosition: Math.min(Math.max(trackerPosition, 0), 100),
      timestamp: event.timestamp,
      type: event.type,
    };
  });

  return { trackerEvents };
};
