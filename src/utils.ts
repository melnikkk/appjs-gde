import Konva from 'konva';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from './constants';

export const prepareEvent = (event, startTime: number) => {
  const scaleX = VIDEO_WIDTH / event.view.innerWidth;
  const scaleY = VIDEO_HEIGHT / event.view.innerHeight;

  const timeFromStart = (event.timestamp - startTime) / 1000;

  return {
    id: event.id,
    coordinates: [event.coordinates[0] * scaleX, event.coordinates[1] * scaleY],
    timeFromStart,
  };
};

export const exportStageToJson = (stage: Konva.Stage | null) => {
  if (!stage) return;

  console.log(stage.toJSON());
};
