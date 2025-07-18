import { useRef, useCallback } from 'react';
import { VideoTimestampIndicator } from '../../recordingTimelineTracker/components/VideoTimestampIndicator';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectRecordingPauseTimestamp } from '@/entities/editor/model/selectors';
import { selectCurrentEventId } from '@/entities/recordingEvent/model/selectors';

interface Props extends React.PropsWithChildren {
  recordingDuration: number;
  onClick: (timeStamp: number) => void;
}

export const TimelineTracker: React.FC<Props> = ({
  recordingDuration,
  children,
  onClick,
}) => {
  const recordingPauseTimestamp = useAppSelector(selectRecordingPauseTimestamp);
  const currentEventId = useAppSelector(selectCurrentEventId);

  const timestampPosition = (recordingPauseTimestamp / recordingDuration) * 100;

  const trackRef = useRef<HTMLDivElement>(null);

  const onTrackerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const positionPercentage = (x / rect.width) * 100;

        const trackerTimestamp = Math.round(
          (positionPercentage * recordingDuration) / 100,
        );

        onClick(trackerTimestamp);
      }
    },
    [onClick, trackRef, recordingDuration],
  );

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="relative mt-6 mb-4 h-2 w-full cursor-pointer rounded-full bg-gray-300"
        onClick={onTrackerClick}
      >
        <VideoTimestampIndicator
          position={timestampPosition}
          isVisible={!currentEventId && recordingPauseTimestamp > 0}
          currentTime={recordingPauseTimestamp}
        />
        {children}
      </div>
    </div>
  );
};
