import { Coordinates } from '.';

interface Size {
  width: number;
  height: number;
}

export const scaleCoordinates = (
  outputSize: Size,
  eventScreenSize: Size,
  eventCoordinates: Coordinates,
): Coordinates => {
  const { x, y } = eventCoordinates;

  const scaleX = outputSize.width / eventScreenSize.width;
  const scaleY = outputSize.height / eventScreenSize.height;
  debugger;
  return {
    x: Math.round(x * scaleX),
    y: Math.round(y * scaleY),
  };
};
