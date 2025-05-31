import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectRecordingEventToAdd,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setRecordingEventToAdd } from '@/infrastructure/store/slices/recordingEvents/slice';
import { RecordingTimelineTracker } from '../RecordingTimelineTracker';
import { PreviousRecordingEventButton } from './PreviousRecdingEventButton';
import { NextRecordingEventButton } from './NextRecordingEventButton';
import { AddEventForm } from '@/app/pages/Recording/components/AddEventDialog/AddEventForm';
import { useTrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/hooks';
import { AddEventDialogProvider } from '@/app/pages/Recording/contexts/AddEventDialogContext';

interface Props {
  startPointTimestamp: number;
  endPointTimestamp: number;
  duration: number;
  recordingEvents: RecordingEvents;
}

export const RecordingTimelineNavigation: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
  duration,
}) => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const recordingEventToAdd = useAppSelector(selectRecordingEventToAdd);

  const { trackerEvents } = useTrackerEvents({
    recordingEvents,
    startPointTimestamp,
    recordingDuration: duration,
  });

  return (
    <>
      <div className="my-6 flex w-full items-center justify-center gap-2">
        <PreviousRecordingEventButton
          currentEventIndex={currentEventIndex}
          trackerEvents={trackerEvents}
        />
        <RecordingTimelineTracker
          trackerEvents={trackerEvents}
          startPointTimestamp={startPointTimestamp}
          recordingDuration={duration}
        />
        <NextRecordingEventButton
          currentEventIndex={currentEventIndex}
          trackerEvents={trackerEvents}
        />
      </div>
      {recordingEventToAdd ? (
        <div className="mx-2">
          <div className="mb-2 space-y-2">
            <h4 className="font-medium">Add Event</h4>
            <p className="text-muted-foreground text-sm">
              Add a custom event at this timestamp in the recording.
            </p>
          </div>
          <AddEventDialogProvider currentTime={0}>
            <AddEventForm
              className="pt-2"
              isTimeFieldEditable={false}
              initialTime={recordingEventToAdd.timestamp - startPointTimestamp}
              onClose={() => dispatch(setRecordingEventToAdd(null))}
            />
          </AddEventDialogProvider>
        </div>
      ) : null}
    </>
  );
};
