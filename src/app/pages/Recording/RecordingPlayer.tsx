import { Recording } from '@/domain/Recordings';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEvent,
  selectRecordingEventToAdd,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { VideoPlayer } from './VideoPlayer';
import { selectRecordingPauseTimestamp } from '@/infrastructure/store/slices/editor/selectors';
import { RecordingEventsPresenter } from '@/app/pages/Recording/RecordingEventsPresenter';
import { useMediaDimensions } from '@/app/pages/Recording/hooks/useMediaDimensions';

interface Props {
  recording: Recording;
  onTimeUpdate?: (time: number) => void;
}

export const RecordingPlayer: React.FC<Props> = ({ recording, onTimeUpdate }) => {
  const { mediaRef, handleMediaLoad, dimensions } = useMediaDimensions();
  const videoRef = mediaRef as React.RefObject<HTMLVideoElement>;

  const currentEvent = useAppSelector(selectCurrentEvent);
  const recordingEventToAdd = useAppSelector(selectRecordingEventToAdd);
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
      {/* TODO: needs to be refactored */}
      {(currentEvent || recordingEventToAdd) && (
        <RecordingEventsPresenter
          initialDimensions={recording.viewData}
          initialEventCoordinates={
            currentEvent?.data.coordinates ||
            recordingEventToAdd?.coordinates || { x: 0, y: 0 }
          }
          dimensions={dimensions}
        />
      )}
    </div>
  );
};
