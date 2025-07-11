import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import { Coordinates, Dimensions } from '@/shared/types';
import { RenderableEvent } from '@/shared/types/event-overlay';
import { useResizeObserver } from '@/shared/hooks/useResizeObserver';
import { scaleCoordinates } from '@/shared/lib/coordinate-utils';

interface Props {
  width: number;
  height: number;
  event: RenderableEvent;
  initialDimensions: Dimensions;
  currentDimensions?: Dimensions;
  onPositionChangeEnd?: (coordinates: Coordinates) => void;
}

export const EventOverlay: React.FC<Props> = ({
  width,
  height,
  event,
  initialDimensions,
  currentDimensions,
  onPositionChangeEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const containerDimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (containerDimensions && stageRef.current) {
      const { width: actualWidth, height: actualHeight } = containerDimensions;

      if (actualWidth > 0 && actualHeight > 0) {
        stageRef.current.width(actualWidth);
        stageRef.current.height(actualHeight);
        stageRef.current.batchDraw();
      }
    }
  }, [containerDimensions]);

  useEffect(() => {
    const layer = layerRef.current;

    if (!layer) {
      return;
    }

    layer.destroyChildren();

    const originalCoordinates = event.getCoordinates();

    let renderCoordinates = { ...originalCoordinates };

    if (initialDimensions && currentDimensions) {
      renderCoordinates = scaleCoordinates(
        currentDimensions,
        initialDimensions,
        originalCoordinates,
      );
    }

    const group = event.render(layer, {
      onDragEnd: () => {
        if (onPositionChangeEnd && group) {
          const newPosition = group.position();

          onPositionChangeEnd(newPosition);
        }
      },
    });

    group.position({
      x: renderCoordinates.x,
      y: renderCoordinates.y,
    });

    layer.add(group);

    layer.batchDraw();

    return () => {
      layer.destroyChildren();
    };
  }, [event, onPositionChangeEnd, initialDimensions, currentDimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        maxHeight: `${height}px`,
        maxWidth: `${width}px`,
      }}
    >
      <Stage
        ref={stageRef}
        width={containerDimensions?.width || width}
        height={containerDimensions?.height || height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer ref={layerRef} />
      </Stage>
    </div>
  );
};
