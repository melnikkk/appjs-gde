import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';

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

export interface GetRecordingEventsResponse {
  entities: RecordingEvents;
  sortedEventIds: Array<string>;
}

export interface EditRecordingEventDto {
  recordingId: string;
  eventId: string;
  event: Partial<RecordingEvent>;
}

export interface RecordingEventsState {
  currentEventId: string | null;
}
interface ClickRecordingEventData {
  coordinates: {
    x: number;
    y: number;
  };
}
type RecordingEventData = ClickRecordingEventData;

export interface Coordinates {
  x: number;
  y: number;
}

export interface RecordingEvent {
  id: string;
  title: string;
  description: string | null;
  screenshotUrl: string | null;
  timestamp: number;
  type: RecordingEventType;
  data: RecordingEventData;
}

export type RecordingEvents = Record<string, RecordingEvent>;
