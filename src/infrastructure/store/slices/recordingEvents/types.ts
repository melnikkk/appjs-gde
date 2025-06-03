import { RecordingEvent, RecordingEvents } from '@/domain/RecordingEvents';

export interface AddRecordingEventsDto {
  recordingId: string;
  events: RecordingEvents;
}

export interface DeleteRecordingEventDto {
  recordingId: string;
  eventId: string;
}

export interface EditRecordingEventDto {
  recordingId: string;
  eventId: string;
  event: Partial<RecordingEvent>;
}

export interface RecordingEventsState {
  currentEventIndex: number;
  currentEventId: string | null;
  sortedEventIds: Array<string>;
  entities: RecordingEvents;
}
