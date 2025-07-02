import { Recording } from '@/entities/recording/model/types';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { VideoPlayer } from './VideoPlayer';
import { selectRecordingPauseTimestamp } from '@/entities/editor/model/selectors';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';
import { selectCurrentEvent } from '@/entities/recordingEvent/model/selectors';
import { useMediaDimensions } from '@/shared/hooks/useMedia/useMediaDimensions';

interface Props {
  recording: Recording;
  onTimeUpdate?: (time: number) => void;
}

export const RecordingPlayer: React.FC<Props> = ({ recording, onTimeUpdate }) => {
  const { mediaRef, handleMediaLoad, dimensions } = useMediaDimensions();
  const videoRef = mediaRef as React.RefObject<HTMLVideoElement>;

  const selectedEvent = useAppSelector(selectCurrentEvent);
  const recordingPauseTimestamp = useAppSelector(selectRecordingPauseTimestamp);

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;
  console.log(dimensions, 'dimensions in RecordingPlayer');
  return (
    <div className="relative">
      <VideoPlayer
        width={recording.viewData.width}
        height={recording.viewData.height}
        source={recordingSourceUrl}
        pauseTime={recordingPauseTimestamp}
        onTimeUpdate={onTimeUpdate}
        videoRef={videoRef}
        handleMediaLoad={handleMediaLoad}
      />
      {selectedEvent ? (
        <RecordingEventsPresenter
          initialDimensions={recording.viewData}
          coordinates={selectedEvent.data.coordinates}
          dimensions={dimensions}
        />
      ) : null}
    </div>
  );
};
