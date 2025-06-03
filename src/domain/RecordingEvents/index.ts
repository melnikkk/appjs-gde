import { RecordingEventType } from './constants';

export interface Coordinates {
  x: number;
  y: number;
}

export interface ClickRecordingEventData {
  coordinates: {
    x: number;
    y: number;
  };
}

export type RecordingEventData = ClickRecordingEventData;

export interface RecordingEvent {
  id: string;
  timestamp: number;
  screenshotUrl: string | null;
  type: RecordingEventType;
  data: RecordingEventData;
}

export type RecordingEvents = Record<string, RecordingEvent>;
