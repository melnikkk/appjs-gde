import { PlusIcon, PencilIcon } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';

export const AddEventDialogTrigger = () => {
  const { setIsOpen } = useAddEventDialog();

  const currentEventId = useAppSelector(selectCurrentEventId);

  const onDialogTriggerClick = () => {
    setIsOpen(true);
  };

  return (
    <DialogTrigger asChild>
      <Button className="flex items-center gap-1.5" onClick={onDialogTriggerClick}>
        {currentEventId ? (
          <PencilIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </Button>
    </DialogTrigger>
  );
};
