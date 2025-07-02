import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectTrackerEvents } from '@/entities/recordingEvent/model/selectors';
import {
  PreviousRecordingEventButton,
  NextRecordingEventButton,
} from '@/features/recordingEvent/recordingEventNavigation';
import { RecordingTimelineTracker } from './RecordingTimelineTracker';

interface Props {
  startPointTimestamp: number;
  endPointTimestamp: number;
  duration: number;
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
