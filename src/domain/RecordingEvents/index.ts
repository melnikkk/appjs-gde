import { RecordingEventType } from './constants';

export interface Coordinates {
  x: number;
  y: number;
}

export interface ClickRecordingEventData {
  coordinates: {
    x: number;
    y: number;
    pageX: number;
    pageY: number;
  };
  view: {
    innerWidth: number;
    innerHeight: number;
    scrollX: number;
    scrollY: number;
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
