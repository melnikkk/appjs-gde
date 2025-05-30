import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import { Coordinates } from '@/domain/RecordingEvents';

interface Props {
  width: number;
  height: number;
  coordinates: Coordinates;
}

export const CanvasOverlay: React.FC<Props> = ({ width, height, coordinates }) => {
  const { x, y } = coordinates;

  return (
    <Stage
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Layer>
        <Circle radius={20} fill="green" stroke="black" strokeWidth={2} x={x} y={y} />
      </Layer>
    </Stage>
  );
};
