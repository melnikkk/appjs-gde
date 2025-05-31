import { RecordingEvents } from '../RecordingEvents';

export interface Dimensions {
  width: number;
  height: number;
}

export interface Recording {
  id: string;
  name: string;
  sourceUrl: string;
  createdAt: string;
  fileSize: number;
  startTime: number;
  stopTime: number;
  duration: number;
  thumbnailUrl: string | null;
  viewData: Dimensions;
  events: RecordingEvents;
}

export type Recordings = Array<Recording>;
