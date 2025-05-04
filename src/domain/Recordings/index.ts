import { RecordingEvents } from '../RecordingEvents';

export interface Recording {
  id: string;
  name: string;
  sourceUrl: string;
  createdAt: string;
  fileSize: number;
  startTime: string;
  endTime: string;
  duration: number;
  thumbnailUrl: string | null;
  events: RecordingEvents;
}

export type Recordings = Array<Recording>;
