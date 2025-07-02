import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui-kit/dialog';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectCurrentEvent } from '@/entities/recordingEvent/model/selectors';
import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import { selectRecordingPauseTimestamp } from '@/entities/editor/model/selectors';
import { selectCurrentRecordingStartTimestamp } from '@/entities/recording/model/selectors';
import { useAddEventDialog } from '../model/hooks/useAddEventDialog';
import { AddEventDialogProvider } from '../model/AddRecordingEventDialogContext';
import { AddEventDialogTrigger } from './AddRecordingEventDialogTrigger';
import { AddEventForm, AddEventFormValues } from './AddRecordingEventForm';
import {
  EventFormMode,
  FORM_DESCRIPTION_BY_MODE,
  FORM_TITLE_BY_MODE,
} from '../model/constants';

export const AddEventDialogComponent = () => {
  const { isOpen, setIsOpen, addCustomEvent, isSubmitting, editExistingEvent } =
    useAddEventDialog();

  const currentRecordingStartTimestamp = useAppSelector(
    selectCurrentRecordingStartTimestamp,
  );
  const selectedEvent = useAppSelector(selectCurrentEvent);
  const recordingPauseTimestamp = useAppSelector(selectRecordingPauseTimestamp);

  const mode = selectedEvent ? EventFormMode.EDIT : EventFormMode.CREATE;
  const initialValues =
    selectedEvent && currentRecordingStartTimestamp
      ? {
          time: selectedEvent.timestamp - currentRecordingStartTimestamp,
          type: selectedEvent.type,
          title: selectedEvent.title,
          description: selectedEvent.description ?? '',
        }
      : {
          time: recordingPauseTimestamp,
          type: RecordingEventType.CLICK,
          title: '',
          description: '',
        };

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onCancelClick = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values: AddEventFormValues) => {
    if (mode === EventFormMode.EDIT && editExistingEvent) {
      await editExistingEvent(values);
    }

    if (mode === EventFormMode.CREATE && addCustomEvent) {
      await addCustomEvent(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <AddEventDialogTrigger />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{FORM_TITLE_BY_MODE[mode]}</DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground">{FORM_DESCRIPTION_BY_MODE[mode]}</div>

        <AddEventForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          mode={mode}
          initialValues={initialValues}
          onCancel={onCancelClick}
        />
      </DialogContent>
    </Dialog>
  );
};

export const AddEventDialog: React.FC = () => {
  return (
    <AddEventDialogProvider>
      <AddEventDialogComponent />
    </AddEventDialogProvider>
  );
};
