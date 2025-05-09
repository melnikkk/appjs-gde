import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import Konva from 'konva';
import { Recording } from '@/domain/Recordings';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
} from '@/infrastructure/store/slices/editor/selectors';
import { CanvasOverlay } from './CanvasOverlay';

interface Props {
  recording: Recording;
  dimensions?: { width: number; height: number };
}

export const RecordingEventsPresenter: FC<Props> = ({ recording, dimensions }) => {
  const stageRef = useRef<Konva.Stage>(null);

  const currentEventIndex = useSelector(selectCurrentEventIndex);
  const currentEventId = useSelector(selectCurrentEventId);

  const currentEvent = currentEventId
    ? recording?.events[currentEventId]
    : Object.values(recording?.events || {}).find(
        (event) => event.index === currentEventIndex,
      );

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
