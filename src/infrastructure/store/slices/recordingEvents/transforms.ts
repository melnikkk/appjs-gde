import { RecordingEvents } from '@/domain/RecordingEvents';
import { GetRecordingEventsResponse } from '@/infrastructure/store/slices/recordingEvents/types';

export const getRecordingEventsTransform = (
  data: RecordingEvents,
): GetRecordingEventsResponse => ({
  entities: data,
  sortedEventIds: Object.values(data)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((event) => event.id),
});
