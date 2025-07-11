import { Coordinates, Dimensions } from '../types';

export const scaleCoordinates = (
  outputSize: Dimensions,
  inputSize: Dimensions,
  coordinates: Coordinates,
): Coordinates => {
  const { x, y } = coordinates;

  const scaleX = outputSize.width / inputSize.width;
  const scaleY = outputSize.height / inputSize.height;

  return {
    x: Math.round(x * scaleX),
    y: Math.round(y * scaleY),
  };
};
