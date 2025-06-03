import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventIndex } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { AddEventForm } from '@/app/pages/Recording/components/AddEventDialog/AddEventForm';
import { useTrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/hooks';
import { AddEventDialogProvider } from '@/app/pages/Recording/contexts/AddEventDialogContext';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { setSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/slice';
import { useMediaDimensions } from '@/app/pages/Recording/hooks/useMediaDimensions';
import { Dimensions } from '@/domain/Recordings';
import { RecordingTimelineTracker } from '../RecordingTimelineTracker';
import { PreviousRecordingEventButton } from './PreviousRecdingEventButton';
import { NextRecordingEventButton } from './NextRecordingEventButton';

interface Props {
  startPointTimestamp: number;
  endPointTimestamp: number;
  duration: number;
  recordingEvents: RecordingEvents;
  initialRecordingDimensions: Dimensions;
}

export const RecordingTimelineNavigation: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
  duration,
  initialRecordingDimensions,
}) => {
  const dispatch = useAppDispatch();

  const { dimensions: recordingDimensions } = useMediaDimensions();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const selectedTrackerEvent = useAppSelector(selectSelectedTrackerEvent);

  const { trackerEvents } = useTrackerEvents({
    recordingEvents,
    startPointTimestamp,
    recordingDuration: duration,
    recordingDimensions,
    initialRecordingDimensions,
  });

  const onClose = () => {
    dispatch(setSelectedTrackerEvent(null));
  };

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
      {selectedTrackerEvent ? (
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
              initialTime={selectedTrackerEvent.timestamp - startPointTimestamp}
              onClose={onClose}
            />
          </AddEventDialogProvider>
        </div>
      ) : null}
    </>
  );
};
