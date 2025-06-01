import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  EventFormMode,
  FORM_DESCRIPTION_BY_MODE,
  FORM_TITLE_BY_MODE,
} from '@/app/pages/Recording/components/AddEventForm/constants';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';
import { AddEventDialogProvider } from '../../contexts/AddEventDialogContext';
import { AddEventDialogTrigger } from './AddEventDialogTrigger';
import { AddEventForm, AddEventFormValues } from '../AddEventForm';

export const AddEventDialogComponent = () => {
  const { isOpen, setIsOpen, addCustomEvent, isSubmitting } = useAddEventDialog();

  const selectedEvent = useAppSelector(selectSelectedTrackerEvent);

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleSubmit = (values: AddEventFormValues) => {
    if (selectedEvent) {
      // TODO: handle edit case
    } else {
      addCustomEvent(values);
    }
  };

  const mode = selectedEvent ? EventFormMode.EDIT : EventFormMode.CREATE;
  const initialValues = selectedEvent
    ? {
        time: selectedEvent.timestamp,
        type: selectedEvent.type,
      }
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <AddEventDialogTrigger />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{FORM_TITLE_BY_MODE[mode]}</DialogTitle>
        </DialogHeader>

        <div className="pb-4">
          <div className="text-muted-foreground mb-4">
            {FORM_DESCRIPTION_BY_MODE[mode]}
          </div>
        </div>

        <AddEventForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          mode={mode}
          initialValues={initialValues}
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
