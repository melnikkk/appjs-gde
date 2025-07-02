import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';

export interface TrackerEvent {
  id: string;
  timestamp: number;
  trackerPosition: number;
  type: RecordingEventType;
}

export type TrackerEvents = Array<TrackerEvent>;

export interface EditorState {
  recordingPauseTimestamp: number | null;
}
