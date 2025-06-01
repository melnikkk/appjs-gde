import { Coordinates } from '@/domain/RecordingEvents';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';

export interface TrackerEvent {
  id: string;
  timestamp: number;
  trackerPosition: number;
  type: RecordingEventType;
  coordinates: Coordinates;
}

export type TrackerEvents = Array<TrackerEvent>;

export interface EditorState {
  recordingPauseTimestamp: number | null;
  selectedTrackerEvent: TrackerEvent | null;
}
