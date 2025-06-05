import { Dimensions, Recording } from '@/domain/Recordings';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { VideoPlayer } from './VideoPlayer';
import {
  selectSelectedTrackerEvent,
  selectRecordingPauseTimestamp,
} from '@/infrastructure/store/slices/editor/selectors';
import { RecordingEventsPresenter } from '@/app/pages/Recording/RecordingEventsPresenter';

interface Props {
  recording: Recording;
  dimensions: Dimensions | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate?: (time: number) => void;
  handleMediaLoad: () => void;
}

export const RecordingPlayer: React.FC<Props> = ({
  recording,
  videoRef,
  dimensions,
  onTimeUpdate,
  handleMediaLoad,
}) => {
  const selectedTrackerEvent = useAppSelector(selectSelectedTrackerEvent);
  const recordingPauseTimestamp = useAppSelector(selectRecordingPauseTimestamp);

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;

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
      {selectedTrackerEvent ? (
        <RecordingEventsPresenter
          initialDimensions={recording.viewData}
          coordinates={selectedTrackerEvent.coordinates}
          dimensions={dimensions}
        />
      ) : null}
    </div>
  );
};
