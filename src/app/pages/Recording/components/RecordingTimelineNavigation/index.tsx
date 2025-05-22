import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectEventsAmount,
  selectEventsCache,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { RecordingTimelineTracker } from '../RecordingTimelineTracker';
import { PreviousRecordingEventButton } from './PreviousRecdingEventButton';
import { NextRecordingEventButton } from './NextRecordingEventButton';

interface Props {
  startPointTimestamp: number;
  endPointTimestamp: number;
  duration: number;
  currentTime: number;
  recordingEvents: RecordingEvents;
}

export const RecordingTimelineNavigation: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
  duration,
}) => {
  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const eventsCache = useAppSelector(selectEventsCache);

  return (
    <div className="my-6 flex w-full items-center justify-center gap-2">
      <PreviousRecordingEventButton
        currentEventIndex={currentEventIndex}
        eventsAmount={eventsAmount}
        eventsCache={eventsCache}
      />
      <RecordingTimelineTracker
        recordingEvents={recordingEvents}
        startPointTimestamp={startPointTimestamp}
        recordingDuration={duration}
      />
      <NextRecordingEventButton
        currentEventIndex={currentEventIndex}
        eventsAmount={eventsAmount}
        eventsCache={eventsCache}
      />
    </div>
  );
};
