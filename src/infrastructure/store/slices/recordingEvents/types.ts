import { RecordingEvents } from '@/domain/RecordingEvents';

export interface AddRecordingEventsDto {
  recordingId: string;
  events: RecordingEvents;
}

export interface DeleteRecordingEventDto {
  recordingId: string;
  eventId: string;
}

export interface RecordingEventToAddDto {
  id: string;
  trackerPosition: number;
  timestamp: number;
  coordinates: Coordinates;
}

export interface RecordingEventsState {
  currentEventIndex: number;
  currentEventId: string | null;
  sortedEventIds: Array<string>;
  entities: RecordingEvents;
  recordingEventToAdd: RecordingEventToAddDto | null;
}
