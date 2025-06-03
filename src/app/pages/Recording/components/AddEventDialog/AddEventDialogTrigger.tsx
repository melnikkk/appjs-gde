import { PlusIcon } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { setSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/slice';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';

export const AddEventDialogTrigger = () => {
  const dispatch = useAppDispatch();

  const { setIsOpen } = useAddEventDialog();

  const onDialogTriggerClick = () => {
    dispatch(setCurrentEventId(null));
    dispatch(setSelectedTrackerEvent(null));

    setIsOpen(true);
  };

  return (
    <DialogTrigger asChild>
      <Button className="flex items-center gap-1.5" onClick={onDialogTriggerClick}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </DialogTrigger>
  );
};
