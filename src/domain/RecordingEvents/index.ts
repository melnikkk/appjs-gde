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
  timestamp: string;
  type: RecordingEventType;
  data: RecordingEventData;
}

export type RecordingEvents = Array<RecordingEvent>;
