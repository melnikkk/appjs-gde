import { FC } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';
import { RecordingEvent } from '../../../domain/RecordingEvents';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';

interface Props {
  width: number;
  height: number;
  event: RecordingEvent;
  stageRef: React.RefObject<Konva.Stage | null>;
}

export const CanvasOverlay: FC<Props> = ({ width, height, event, stageRef }) => {
  const radius = 20;
  const { x, y } = scaleCoordinates(
    { width, height },
    { width: event.data.view.innerWidth, height: event.data.view.innerHeight },
    event.data.coordinates,
  );

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
            radius={radius}
            fill="green"
            stroke="black"
            strokeWidth={2}
            x={x}
            y={y}
          />
        </Layer>
      </Stage>
    </>
  );
};
