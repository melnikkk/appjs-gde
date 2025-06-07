import { RecordingEventType } from '@/domain/RecordingEvents/constants';

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
