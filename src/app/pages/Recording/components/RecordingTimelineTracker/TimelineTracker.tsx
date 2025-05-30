import { useState, useRef, useCallback } from 'react';
import { AddEventHint } from './AddEventHint';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setRecordingPauseTimestamp } from '@/infrastructure/store/slices/editor/slice';

interface Props extends React.PropsWithChildren {
  startPointTimestamp: number;
  recordingDuration: number;
  onClick: (timeStamp: number) => void;
}

export const TimelineTracker: React.FC<Props> = ({
  startPointTimestamp,
  recordingDuration,
  children,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  const [isHovering, setIsHovering] = useState(false);
  const [hintPosition, setHintPosition] = useState({ x: 0, y: 0 });

  const trackRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const onTrackerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;

        setHintPosition({ x, y: rect.height - 45 });
      }
    },
    [trackRef, popoverRef],
  );

  const onTrackerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const positionPercentage = (x / rect.width) * 100;

        const trackerTimestamp = Math.round(
          (positionPercentage * recordingDuration) / 100,
        );
        const eventTimestamp = trackerTimestamp + startPointTimestamp;

        dispatch(setRecordingPauseTimestamp(trackerTimestamp));

        onClick(eventTimestamp);
      }
    },
    [onClick, trackRef, startPointTimestamp, recordingDuration],
  );

  const onTrackerMouseEnter = () => setIsHovering(true);
  const onTrackerMouseLeave = () => setIsHovering(false);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="relative mt-6 mb-4 h-2 w-full cursor-pointer rounded-full bg-gray-300"
        onMouseEnter={onTrackerMouseEnter}
        onMouseLeave={onTrackerMouseLeave}
        onMouseMove={onTrackerMouseMove}
        onClick={onTrackerClick}
      >
        {children}
      </div>
      <AddEventHint isHovering={isHovering} position={hintPosition} />
    </div>
  );
};
