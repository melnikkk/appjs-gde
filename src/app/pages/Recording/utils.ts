import Konva from 'konva';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from './constants';
import { RecordingEvent } from './types';

export const prepareEvent = (event: RecordingEvent, startTime: number) => {
  const scaleX = VIDEO_WIDTH / event.view.innerWidth;
  const scaleY = VIDEO_HEIGHT / event.view.innerHeight;

  const timeFromStart = (event.timestamp - startTime) / 1000;

  return {
    id: event.id,
    coordinates: [event.coordinates[0] * scaleX, event.coordinates[1] * scaleY] as [
      number,
      number,
    ],
    timeFromStart,
  };
};

export const exportStageToJson = (stage: Konva.Stage | null) => {
  if (!stage) return;

  console.log(stage.toJSON());
};
