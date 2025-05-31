export interface TrackerEvent {
  id: string;
  timestamp: number;
  coordinates: Coordinates;
  trackerPosition: number;
}

export type TrackerEvents = Array<TrackerEvent>;
