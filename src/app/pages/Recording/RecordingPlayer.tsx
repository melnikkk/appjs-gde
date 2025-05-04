import { FC } from 'react';
import { useSelector } from 'react-redux';
import { VideoPlayer } from './VideoPlayer';
import { selectCurrentEventIndex } from '../../../infrastructure/store/slices/editor/selectors';
import { Recording } from '../../../domain/Recordings';

interface Props {
  recording: Recording;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

export const RecordingPlayer: FC<Props> = ({ recording, onResize }) => {
  const currentEventIndex = useSelector(selectCurrentEventIndex);

  const currentEvent = recording?.events[currentEventIndex];

  if (!currentEvent) {
    return null;
  }

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;
  const pauseTime = Number(BigInt(currentEvent.timestamp) - BigInt(recording.startTime));

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
