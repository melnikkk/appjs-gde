import React, { useRef } from 'react';
import Konva from 'konva';
import { Recording } from '@/domain/Recordings';
import { CanvasOverlay } from './CanvasOverlay';
import { useCurrentEvent } from './hooks/useCurrentEvent';

interface Props {
  recording: Recording;
  dimensions?: { width: number; height: number };
}

export const RecordingEventsPresenter: React.FC<Props> = ({ recording, dimensions }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const { currentEvent } = useCurrentEvent(recording);

  if (!currentEvent) {
    return null;
  }

  const width = dimensions?.width || currentEvent.data.view.innerWidth;
  const height = dimensions?.height || currentEvent.data.view.innerHeight;

  return (
    <CanvasOverlay
      event={currentEvent}
      width={width}
      height={height}
      stageRef={stageRef}
    />
  );
};
