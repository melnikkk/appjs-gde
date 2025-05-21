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

  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = eventScreenSize.width * scale;
  const scaledHeight = eventScreenSize.height * scale;

  const offsetX = (outputSize.width - scaledWidth) / 2;
  const offsetY = (outputSize.height - scaledHeight) / 2;

  return {
    x: Math.round(x * scale + offsetX),
    y: Math.round(y * scale + offsetY),
  };
};
