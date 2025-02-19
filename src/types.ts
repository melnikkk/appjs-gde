export interface RecordingEvent {
  id: string;
  coordinates: [number, number];
  view: {
    innerWidth: number;
    innerHeight: number;
  };
}
