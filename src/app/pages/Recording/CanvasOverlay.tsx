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
  const [position, setPosition] = useState<Coordinates>({
    x: coordinates.x,
    y: coordinates.y,
  });

  const groupRef = useRef<Konva.Group>(null);
  const outerCircleRef = useRef<Konva.Circle>(null);
  const middleCircleRef = useRef<Konva.Circle>(null);
  const innerCircleRef = useRef<Konva.Circle>(null);

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
    <Stage
      width={width}
      height={height}
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
  );
};
