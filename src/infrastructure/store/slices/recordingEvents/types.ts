import { RecordingEvent, RecordingEvents } from '@/domain/RecordingEvents';

export interface AddRecordingEventsDto {
  recordingId: string;
  events: RecordingEvents;
}

export interface DeleteRecordingEventDto {
  recordingId: string;
  eventId: string;
}

export interface GetRecordingEventsDto {
  recordingId: string;
}

export type GetRecordingEventsResponse = {
  entities: RecordingEvents;
  sortedEventIds: Array<string>;
};

export interface EditRecordingEventDto {
  recordingId: string;
  eventId: string;
  event: Partial<RecordingEvent>;
}

export interface RecordingEventsState {
  currentEventId: string | null;
}
