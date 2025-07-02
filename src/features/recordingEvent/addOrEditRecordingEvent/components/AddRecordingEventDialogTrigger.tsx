import { PlusIcon, PencilIcon } from 'lucide-react';
import { DialogTrigger } from '@/shared/ui-kit/dialog';
import { Button } from '@/shared/ui-kit/button';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectCurrentEventId } from '@/entities/recordingEvent/model/selectors';
import { useAddEventDialog } from '../model/hooks/useAddEventDialog';

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
