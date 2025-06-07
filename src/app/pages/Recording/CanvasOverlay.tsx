import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Group } from 'react-konva';
import { Coordinates } from '@/domain/RecordingEvents';

interface Props {
  width: number;
  height: number;
  coordinates: Coordinates;
  onPositionChangeEnd?: (coordinates: Coordinates) => void;
}

export const CanvasOverlay: React.FC<Props> = ({
  width,
  height,
  coordinates,
  onPositionChangeEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const groupRef = useRef<Konva.Group>(null);
  const outerCircleRef = useRef<Konva.Circle>(null);
  const middleCircleRef = useRef<Konva.Circle>(null);
  const innerCircleRef = useRef<Konva.Circle>(null);

  const [position, setPosition] = useState<Coordinates>({
    x: coordinates.x,
    y: coordinates.y,
  });

  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height,
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        const { width: actualWidth, height: actualHeight } = entry.contentRect;

        if (actualWidth > 0 && actualHeight > 0) {
          setCanvasSize({
            width: actualWidth,
            height: actualHeight,
          });

          if (stageRef.current) {
            stageRef.current.width(actualWidth);
            stageRef.current.height(actualHeight);
            stageRef.current.batchDraw();
          }
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const handleDragMove = () => {
    if (groupRef.current) {
      const newPos = groupRef.current.position();
      setPosition(newPos);
    }
  };

  const handleDragEnd = () => {
    if (groupRef.current) {
      const finalPos = groupRef.current.position();
      if (onPositionChangeEnd) {
        onPositionChangeEnd(finalPos);
      }
    }
  };

  useEffect(() => {
    setPosition({ x: coordinates.x, y: coordinates.y });
  }, [coordinates]);

  useEffect(() => {
    if (outerCircleRef.current) {
      const pulseAnimation = new Konva.Animation(
        (frame) => {
          if (!frame || !outerCircleRef.current || !middleCircleRef.current) return;

          const scale = 1 + Math.sin(frame.time / 400) * 0.2;
          outerCircleRef.current.opacity(0.4 - Math.sin(frame.time / 400) * 0.2);
          outerCircleRef.current.scale({ x: scale, y: scale });

          const middleScale = 1 + Math.sin(frame.time / 600) * 0.1;
          middleCircleRef.current.scale({ x: middleScale, y: middleScale });
        },
        [outerCircleRef.current.getLayer()],
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    }
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.on('mouseover', () => {
        document.body.style.cursor = 'grab';
      });

      groupRef.current.on('mouseout', () => {
        document.body.style.cursor = 'default';
      });

      return () => {
        groupRef.current?.off('mouseover');
        groupRef.current?.off('mouseout');
      };
    }
  }, []);

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
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer>
          <Group
            ref={groupRef}
            x={position.x}
            y={position.y}
            draggable={true}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <Circle
              ref={outerCircleRef}
              radius={32}
              fill="#d8b5ff"
              opacity={0.4}
              x={0}
              y={0}
              shadowColor="#d8b5ff"
              shadowBlur={25}
              shadowOpacity={0.7}
            />
            <Circle
              ref={middleCircleRef}
              radius={24}
              fill="#c59dff"
              opacity={0.6}
              x={0}
              y={0}
              shadowColor="#c59dff"
              shadowBlur={20}
              shadowOpacity={0.7}
            />
            <Circle
              ref={innerCircleRef}
              radius={16}
              fill="#b27eff"
              x={0}
              y={0}
              shadowColor="#b27eff"
              shadowBlur={5}
              shadowOpacity={0.7}
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};
