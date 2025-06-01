import { Coordinates } from '@/domain/RecordingEvents';

export interface TrackerEvent {
  id: string;
  timestamp: number;
  trackerPosition: number;
  coordinates: Coordinates;
}

export type TrackerEvents = Array<TrackerEvent>;

export interface EditorState {
  recordingPauseTimestamp: number | null;
  selectedTrackerEvent: TrackerEvent | null;
}
