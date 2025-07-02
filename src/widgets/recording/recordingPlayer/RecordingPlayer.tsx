import { Recording } from '@/entities/recording/model/types';
import { Dimensions } from '@/shared/types';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { VideoPlayer } from './components/VideoPlayer';
import { selectRecordingPauseTimestamp } from '@/entities/editor/model/selectors';
import { RecordingEventsPresenter } from './components/RecordingEventsPresenter';
import { selectCurrentEvent } from '@/entities/recordingEvent/model/selectors';

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
  const selectedEvent = useAppSelector(selectCurrentEvent);
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
