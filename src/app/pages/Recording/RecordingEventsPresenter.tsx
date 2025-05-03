import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import Konva from 'konva';
import { Recording } from '@/domain/Recordings';
import { selectCurrentEventIndex } from '@/infrastructure/store/slices/editor/selectors';
import { CanvasOverlay } from './CanvasOverlay';

interface Props {
  recording: Recording;
  dimensions?: { width: number; height: number };
}

export const RecordingEventsPresenter: FC<Props> = ({ recording, dimensions }) => {
  const stageRef = useRef<Konva.Stage>(null);

  const currentEventIndex = useSelector(selectCurrentEventIndex);
  const currentEvent = recording?.events[currentEventIndex];

  if (!currentEvent) {
    return null;
  }

  const width = dimensions?.width || currentEvent.data.view.innerWidth;
  const height = dimensions?.height || currentEvent.data.view.innerHeight;

  if (!currentEvent) {
    return null;
  }

  return (
    <CanvasOverlay
      event={currentEvent}
      width={width}
      height={height}
      stageRef={stageRef}
    />
  );
};
