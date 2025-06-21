import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectTrackerEvents } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { Dimensions } from '@/domain/Recordings';
import { RecordingTimelineTracker } from '../RecordingTimelineTracker';
import { PreviousRecordingEventButton } from './PreviousRecdingEventButton';
import { NextRecordingEventButton } from './NextRecordingEventButton';

interface Props {
  startPointTimestamp: number;
  endPointTimestamp: number;
  duration: number;
  initialRecordingDimensions: Dimensions;
  currentRecordingDimensions: Dimensions | null;
}

export const RecordingTimelineNavigation: React.FC<Props> = ({
  startPointTimestamp,
  duration,
}) => {
  const trackerEvents = useAppSelector(selectTrackerEvents);

  return (
    <div className="my-6 flex w-full items-center justify-center gap-2">
      <PreviousRecordingEventButton startPointTimestamp={startPointTimestamp} />
      <RecordingTimelineTracker
        trackerEvents={trackerEvents}
        startPointTimestamp={startPointTimestamp}
        recordingDuration={duration}
      />
      <NextRecordingEventButton startPointTimestamp={startPointTimestamp} />
    </div>
  );
};
