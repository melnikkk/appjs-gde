import { Coordinates } from '.';
import { Dimensions } from '@/domain/Recordings';

export const scaleCoordinates = (
  outputSize: Dimensions,
  eventScreenSize: Dimensions,
  eventCoordinates: Coordinates,
): Coordinates => {
  const { x, y } = eventCoordinates;

  const scaleX = outputSize.width / eventScreenSize.width;
  const scaleY = outputSize.height / eventScreenSize.height;

  return {
    x: Math.round(x * scaleX),
    y: Math.round(y * scaleY),
  };
};
