import { RecordingEvents } from '@/domain/RecordingEvents';

export interface AddRecordingEventsDto {
  recordingId: string;
  events: RecordingEvents;
}
