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
  timestamp: number;
  index: number;
  screenshotUrl: string | null;
  type: RecordingEventType;
  data: RecordingEventData;
}

export type RecordingEvents = Record<string, RecordingEvent>;
