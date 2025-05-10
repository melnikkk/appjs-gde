import { RecordingEventType } from './constants';

export interface ClickRecordingEventData {
  coordinates: {
    x: number;
    y: number;
  };
  view: {
    innerWidth: number;
    innerHeight: number;
  };
}

export type RecordingEventData = ClickRecordingEventData;

export interface RecordingEvent {
  id: string;
  data: RecordingEventData;
  timestamp: number;
  type: RecordingEventType;
  index: number;
}

export type RecordingEvents = Record<string, RecordingEvent>;
