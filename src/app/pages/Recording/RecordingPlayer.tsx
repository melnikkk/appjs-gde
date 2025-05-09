import { FC } from 'react';
import { VideoPlayer } from './VideoPlayer';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
} from '@/infrastructure/store/slices/editor/selectors';
import { Recording } from '@/domain/Recordings';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';

interface Props {
  recording: Recording;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

export const RecordingPlayer: FC<Props> = ({ recording, onResize }) => {
  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const currentEventId = useAppSelector(selectCurrentEventId);

  const currentEvent = currentEventId
    ? recording.events[currentEventId]
    : Object.values(recording.events).find((event) => event.index === currentEventIndex);

  if (!currentEvent) {
    return null;
  }

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;
  const pauseTime = currentEvent.timestamp - Number(recording.startTime);

  return (
    <VideoPlayer
      width={currentEvent.data.view.innerWidth}
      height={currentEvent.data.view.innerHeight}
      source={recordingSourceUrl}
      pauseTime={pauseTime}
      onResize={onResize}
    />
  );
};
