import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useParams } from '@tanstack/react-router';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectDoesRecordingEventExist,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useTrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/hooks';
import {
  AddEventForm,
  AddEventFormValues,
} from '@/app/pages/Recording/components/AddEventForm';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { setSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/slice';
import { Dimensions } from '@/domain/Recordings';
import {
  useAddEventsMutation,
  useEditRecordingEventMutation,
} from '@/infrastructure/store/slices/recordingEvents/api';
import { DEFAULT_RECORDING_EVENT_COORDINATES } from '@/domain/RecordingEvents/constants';
import {
  EventFormMode,
  FORM_DESCRIPTION_BY_MODE,
  FORM_TITLE_BY_MODE,
} from '@/app/pages/Recording/components/AddEventForm/constants';
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
  initialRecordingDimensions,
  currentRecordingDimensions,
}) => {
  const dispatch = useAppDispatch();

  const { id: recordingId } = useParams({ strict: false });

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const selectedTrackerEvent = useAppSelector(selectSelectedTrackerEvent);
  const doesEventExist = useAppSelector(
    selectDoesRecordingEventExist(selectedTrackerEvent?.id),
  );

  const [triggerAddEvents, { isLoading: isAddEventsSubmitting }] = useAddEventsMutation();

  const [triggerUpdateRecordingEvent, { isLoading: isEditRecordingEventSubmitting }] =
    useEditRecordingEventMutation();

  const { trackerEvents } = useTrackerEvents({
    startPointTimestamp,
    initialRecordingDimensions,
    recordingDuration: duration,
    recordingDimensions: currentRecordingDimensions,
  });

  const mode = doesEventExist ? EventFormMode.EDIT : EventFormMode.CREATE;

  const onClose = () => {
    dispatch(setSelectedTrackerEvent(null));
  };

  const handleSubmit = async (values: AddEventFormValues) => {
    if (!recordingId || !selectedTrackerEvent) {
      return;
    }

    const { coordinates, timestamp } = selectedTrackerEvent;

    if (mode === EventFormMode.EDIT) {
      try {
        await triggerUpdateRecordingEvent({
          recordingId,
          eventId: selectedTrackerEvent.id,
          event: {
            id: selectedTrackerEvent.id,
            timestamp: selectedTrackerEvent.timestamp,
            type: values.type,
            data: {
              coordinates: coordinates ?? DEFAULT_RECORDING_EVENT_COORDINATES,
            },
          },
        });
      } catch (e) {
        toast.error('Failed to edit custom event. Please try again.');
      }
    }

    if (mode === EventFormMode.CREATE) {
      const eventId = uuidv4();

      try {
        await triggerAddEvents({
          recordingId,
          events: {
            [eventId]: {
              id: eventId,
              timestamp,
              type: values.type,
              data: {
                coordinates: coordinates ?? DEFAULT_RECORDING_EVENT_COORDINATES,
              },
              screenshotUrl: null,
            },
          },
        }).unwrap();

        onClose();

        toast.success(`Custom event "${values.type}" added successfully.`);
      } catch (error) {
        toast.error('Failed to add custom event. Please try again.');
      }
    }
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
            <h4 className="font-medium">{FORM_TITLE_BY_MODE[mode]}</h4>
            <p className="text-muted-foreground text-sm">
              {FORM_DESCRIPTION_BY_MODE[mode]}
            </p>
          </div>

          <AddEventForm
            className="pt-2"
            isTimeFieldEditable={false}
            mode={mode}
            isSubmitting={isAddEventsSubmitting || isEditRecordingEventSubmitting}
            initialValues={{
              time: selectedTrackerEvent.timestamp - startPointTimestamp,
            }}
            onSubmit={handleSubmit}
          />
        </div>
      ) : null}
    </>
  );
};
