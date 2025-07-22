import { Recording } from '@/entities/recording/model/types';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectRecordingPauseTimestamp } from '@/entities/editor/model/selectors';
import { selectCurrentEvent } from '@/entities/recordingEvent/model/selectors';
import { useMediaDimensions } from '@/shared/hooks/useMedia/useMediaDimensions';
import { AuthenticatedVideo } from '@/shared/components/AuthenticatedVideo';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';

interface Props {
  recording: Recording;
  onTimeUpdate?: (time: number) => void;
}

export const RecordingPlayer: React.FC<Props> = ({ recording, onTimeUpdate }) => {
  const { mediaRef, handleMediaLoad, dimensions } = useMediaDimensions();
  const videoRef = mediaRef as React.RefObject<HTMLVideoElement>;

  const selectedEvent = useAppSelector(selectCurrentEvent);
  const recordingPauseTimestamp = useAppSelector(selectRecordingPauseTimestamp);

  return (
    <div className="relative">
      <AuthenticatedVideo
        width={recording.viewData.width}
        height={recording.viewData.height}
        videoPath={recording?.sourceUrl}
        pauseTime={recordingPauseTimestamp}
        onTimeUpdate={onTimeUpdate}
        videoRef={videoRef}
        handleMediaLoad={handleMediaLoad}
      />
      {selectedEvent ? (
        <RecordingEventsPresenter
          initialDimensions={recording.viewData}
          dimensions={dimensions}
        />
      ) : null}
    </div>
  );
};
