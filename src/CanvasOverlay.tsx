import { FC } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';
import { RecordingEvent } from './types';

interface Props {
  width: number;
  height: number;
  event: RecordingEvent;
  stageRef: React.RefObject<Konva.Stage | null>;
}

export const CanvasOverlay: FC<Props> = ({ width, height, event, stageRef }) => {
  return (
    <>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer>
          <Circle
            key={event.id}
            radius={20}
            fill="green"
            x={event.coordinates[0]}
            y={event.coordinates[1]}
          />
        </Layer>
      </Stage>
    </>
  );
};
