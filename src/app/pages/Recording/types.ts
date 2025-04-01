export interface RecordingEvent {
  id: string;
  timestamp: number;
  coordinates: [number, number];
  view: {
    innerWidth: number;
    innerHeight: number;
  };
}

export type RecordingEvents = Array<RecordingEvent>;
