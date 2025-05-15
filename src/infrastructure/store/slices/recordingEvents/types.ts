import { RecordingEvents } from '@/domain/RecordingEvents';

export interface AddRecordingEventsDto {
  recordingId: string;
  events: RecordingEvents;
}

export interface DeleteRecordingEventDto {
  recordingId: string;
  eventId: string;
}
