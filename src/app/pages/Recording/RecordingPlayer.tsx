import React from 'react';
import { Recording } from '@/domain/Recordings';
import { VideoPlayer } from './VideoPlayer';
import { useCurrentEvent } from './hooks/useCurrentEvent';

interface Props {
  recording: Recording;
  onResize?: (dimensions: { width: number; height: number }) => void;
  onTimeUpdate?: (time: number) => void;
}

export const RecordingPlayer: React.FC<Props> = ({
  recording,
  onResize,
  onTimeUpdate,
}) => {
  const { currentEvent } = useCurrentEvent(recording);

  if (!currentEvent) {
    return null;
  }

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;
  const pauseTime = currentEvent.timestamp - recording.startTime;

  return (
    <VideoPlayer
      width={currentEvent.data.view.innerWidth}
      height={currentEvent.data.view.innerHeight}
      source={recordingSourceUrl}
      pauseTime={pauseTime}
      onResize={onResize}
      onTimeUpdate={onTimeUpdate}
      currentEvent={currentEvent}
    />
  );
};
