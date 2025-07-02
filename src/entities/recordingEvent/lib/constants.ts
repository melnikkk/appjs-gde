import { Coordinates } from '@/entities/recordingEvent/model/types';

export const DEFAULT_RECORDING_EVENT_COORDINATES: Coordinates = {
  x: 50,
  y: 50,
};

export enum RecordingEventType {
  CLICK = 'click',
}
