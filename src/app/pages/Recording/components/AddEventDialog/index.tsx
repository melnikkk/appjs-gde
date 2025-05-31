import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';
import { AddEventDialogTrigger } from '../AddEventDialogTrigger';
import { AddEventDialogProvider } from '../../contexts/AddEventDialogContext';
import { AddEventFormWithDialogClose } from './AddEventForm';

interface Props {
  currentTime?: number;
}

export const AddEventDialogComponent = () => {
  const { isOpen, setIsOpen } = useAddEventDialog();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AddEventDialogTrigger />
      <DialogContent
        className="sm:max-w-[500px]"
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Add Custom Event</DialogTitle>
        </DialogHeader>

        <div className="pb-4">
          <div className="text-muted-foreground mb-4">
            Add a custom event at the current timestamp in the recording.
          </div>
        </div>
        <AddEventFormWithDialogClose />
      </DialogContent>
    </Dialog>
  );
};

export const AddEventDialog: React.FC<Props> = ({ currentTime = 0 }) => {
  return (
    <AddEventDialogProvider currentTime={currentTime}>
      <AddEventDialogComponent />
    </AddEventDialogProvider>
  );
};
