import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';

interface Props {
  width: number;
  height: number;
  event: RecordingEvent;
  stageRef: React.RefObject<Konva.Stage | null>;
  markerColor?: string;
  markerSize?: number;
  markerStrokeColor?: string;
  markerStrokeWidth?: number;
  customMarkerRenderer?: (props: {
    x: number;
    y: number;
    event: RecordingEvent;
  }) => React.ReactNode;
}

export const MediaOverlay: React.FC<Props> = ({
  width,
  height,
  event,
  stageRef,
  markerColor = 'red',
  markerSize = 20,
  markerStrokeColor = 'black',
  markerStrokeWidth = 2,
  customMarkerRenderer,
}) => {
  if (!event.data.coordinates || !event.data.view) {
    return null;
  }

  const { x, y } = scaleCoordinates(
    { width, height },
    { width: event.data.view.innerWidth, height: event.data.view.innerHeight },
    event.data.coordinates,
  );

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <Layer>
        {customMarkerRenderer ? (
          customMarkerRenderer({ x, y, event })
        ) : (
          <Circle
            key={event.id}
            radius={markerSize}
            fill={markerColor}
            stroke={markerStrokeColor}
            strokeWidth={markerStrokeWidth}
            x={x}
            y={y}
          />
        )}
      </Layer>
    </Stage>
  );
};
